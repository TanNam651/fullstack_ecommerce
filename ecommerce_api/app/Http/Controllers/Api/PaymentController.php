<?php

namespace App\Http\Controllers\Api;

use App\Enums\PaymentEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use function Pest\Laravel\json;
use function Webmozart\Assert\Tests\StaticAnalysis\string;

class PaymentController extends Controller
{
    public function getListPaymentStatus():JsonResponse
    {
        return response()->json([
            'status' => PaymentEnum::cases(),
        ]);
    }

    public function vnpayReturn(Request $request):JsonResponse
    {
        if((string) $request->input('status_code')==="00"){
            Payment::where('id',$request->payment_id)->update([
                'transaction_id'=>$request->transaction_id,
                'status'=>PaymentEnum::COMPLETED
            ]);
            return response()->json([
                'success'=>"Thanh cong"
            ], 200);
        }
        else{
            Order::where('id',$request->order_id)->delete();
            return response()->json([
                'error'=>"loi",
                'status'=>$request->status_code
            ],500);
        }
    }
}
