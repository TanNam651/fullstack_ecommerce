<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderEnum;
use App\Enums\PaymentEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

date_default_timezone_set("Asia/Ho_Chi_Minh");

class OrderController extends Controller
{
    public function create(Request $request)
    {
//        $validated = $request->validated();
//        $userId = $request->user()->id;
        try {
            $products = $request->order['products'];
            $order = Order::create([
                'email'=>$request->email,
                'total' => $request->order['total'],
                'shipping_address' => $request->address,
                'status' => OrderEnum::PENDING,
                'review_status' => false,
            ]);

            $payment = $order->payment()->create([
                'payment_method'=>$request->payment_method,
                'status'=>PaymentEnum::PENDING,
                'amount'=>$order->total,
            ]);

            foreach ($products as $product) {
                $order->details()->create([
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['total'],
                    'total' => $product['quantity'] * $product['total'],
                ]);
            }
            if($request->input('payment_method') === "vnpay"){
                $vnp_TmnCode = config('vnpay.vnp_TmnCode');
                $vnp_HashSecret = config('vnpay.vnp_HashSecret');
                $vnp_Url = config('vnpay.vnp_Url');
                $vnp_Returnurl = config('vnpay.vnp_ReturnUrl')."?order_id={$order->id}"."&payment_id={$payment->id}";
                $vnp_TxnRef = time();
                $vnp_OrderInfo = 'Payment for order #' . $vnp_TxnRef;
                $vnp_OrderType = 'billpayment';
                $vnp_Amount = $request->order['total'] * 100; // VNPAY uses VND * 100
                $vnp_Locale = 'vn';
                $vnp_BankCode = 'NCB';
                $vnp_IpAddr = request()->ip();
                $vnp_ExpireDate = date('YmdHis', strtotime('+15 minutes'));

                $inputData = [
                    "vnp_Version" => "2.1.0",
                    "vnp_TmnCode" => $vnp_TmnCode,
                    "vnp_Amount" => $vnp_Amount,
                    "vnp_Command" => "pay",
                    "vnp_CreateDate" => date('YmdHis'),
                    "vnp_CurrCode" => "VND",
                    "vnp_BankCode" => $vnp_BankCode,
                    "vnp_IpAddr" => $vnp_IpAddr,
                    "vnp_Locale" => $vnp_Locale,
                    "vnp_OrderInfo" => $vnp_OrderInfo,
                    "vnp_OrderType" => $vnp_OrderType,
                    "vnp_ReturnUrl" => $vnp_Returnurl,
                    "vnp_TxnRef" => $vnp_TxnRef,
                    "vnp_ExpireDate" => $vnp_ExpireDate,
                ];
                ksort($inputData);

                $query = "";
                $i = 0;
                $hashdata = "";
                foreach ($inputData as $key => $value) {
                    if ($i == 1) {
                        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                    } else {
                        $hashdata .= urlencode($key) . "=" . urlencode($value);
                        $i = 1;
                    }
                    $query .= urlencode($key) . "=" . urlencode($value) . '&';
                }

                $vnp_Url = $vnp_Url . "?" . $query;
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
                return response()->json([
                    'url' => $vnp_Url,
                    'hashdata'=>$products
                ]);
            }

            return response()->json([
                'success'=>'order created'
            ]);

//            ksort($inputData);
//            $query = [];
//            $hashdata = "";
//            foreach ($inputData as $key => $value) {
//                $query[] = urlencode($key) . "=" . urlencode($value);
//                $hashdata .= $key . "=" . $value . '&';
//            }
//
//            $hashdata = rtrim($hashdata, "&");
//            $vnp_SecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
//            $vnp_Url.="?".implode("&",$query)."&vnp_SecureHash=$vnp_SecureHash";
//
//            return response()->json([
//                'url' => $vnp_Url,
//            ]);



//            return response()->json([
//                'url' => $vnp_Url,
//                'hashdata'=>$products
//            ]);
        } catch (QueryException $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function getOrders()
    {
        try {
            $orders = Order::with(['user:id,name,email'])->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Products retrieved successfully',
                'orders' => $orders,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve products',
            ], 500);
        }
    }

    public function getOrderDetails($id):JsonResponse
    {
        try {
            $order = Order::with(['user:id,name,email', 'products:id,name,slug,origin_price,image_url,category_id', 'products.category:id,name,slug,is_last,parent_id'])->find($id);

            foreach ($order->products as $product) {
                $rootCategory = $product->root_category;
                $product['root_category'] = $rootCategory;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Product retrieved successfully',
                'order' => $order,
            ]);
        }catch (QueryException $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getListOrderStatus():JsonResponse
    {
        return response()->json([
            'status' => OrderEnum::cases(),
        ]);

    }
}
