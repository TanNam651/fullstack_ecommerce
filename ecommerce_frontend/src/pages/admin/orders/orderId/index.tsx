import {Order, OrderForm, Product, Status} from "@/pages/admin/orders/orderId/components/order-form.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import {OrderService} from "@/services/OrderService.ts";
import {format} from "date-fns";
import {formatter} from "@/helpers/utils.ts";

export default function OrderPage(){
  const {id} = useParams();
  const [order, setOrder] = useState<Order|null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  // const [paymentStatus, setPaymentStatus] = useState<Payment>()

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const getOrderDetail = async (id:string)=>{
    try {
      const result = await OrderService.GetOrderDetail(id);
      if (!result.data) return null;
      const order = result.data;
      const listProducts = order.products;

      const formattedOrder:Order = {
        user:{
          name: order.user.name,
          email:order.user.email
        },
        status:order.status,
        total:formatter.format(order.total),
        shippingAddress:order.shipping_address,
        createdAt:format(order.created_at, "MMM do,yyyy"),
      }

      const formattedProducts:Product[] = listProducts.map((product)=>({
        id:product.id,
        name:product.name,
        slug:product.slug,
        originPrice:product.origin_price,
        category:product.category.name,
        root_category:product.root_category.name,
        quantity:product.pivot.quantity,
        price:formatter.format(product.pivot.price),
        total:formatter.format(product.pivot.total),
        imageUrl:product.image_url
      }));

      return {
        order:formattedOrder,
        products:formattedProducts
      }

    } catch (error){
      return null;
    }
  }

  const getOrderStatus = async ()=>{
    try {
      const result = await OrderService.GetOrderStatus();
      if (!result.data) return null;
      const listStatus = result.data;

      const formattedStatus:Status[] = listStatus.map((status)=>({
        id:status,
        name: status.toLocaleUpperCase(),
      }));

      return formattedStatus;
    } catch (error){
      return null;
    }
  }

  useEffect(() => {
     if (!id){
       navigate("/admin/orders");
       return;
     }

     startTransition(async ()=>{
       await getOrderDetail(id)
         .then((data)=>{
           if (data?.order){
             console.log(data.order)
             setOrder(data.order)
           }
           if (data?.products){
             setProducts(data.products)
           }
         });

       await getOrderStatus()
         .then((data)=>{
           if (data) setStatus(data);
         })
     });
  }, []);

  return(
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 pt-6 p-2 md:p-8">
          {!isPending&&(
            <OrderForm
              initialData={order}
              products={products}
              listStatus={status}
              loading={isPending}
            />
          )}
        </div>
      </div>
    </>
  );
}