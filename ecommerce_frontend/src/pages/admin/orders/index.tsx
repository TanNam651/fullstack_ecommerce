import {useEffect, useState, useTransition} from "react";
import {OrderService} from "@/services/OrderService.ts";
import {OrderClient} from "@/pages/admin/orders/components/client.tsx";
import {OrderColumn} from "@/pages/admin/orders/components/column.tsx";
import {format} from "date-fns";
import {formatter} from "@/helpers/utils.ts";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderColumn[]>([]);
  const [isPending, startTransition] = useTransition();

  const listOrders = async () => {
    const result = await OrderService.GetOrder();

    if (result.success) return result.data.orders;
    return [];
  }

  useEffect(() => {
    startTransition(async ()=>{
      const data = await listOrders();
      console.log(data)
      const formattedOrders:OrderColumn[] = data.map((order)=>({
        id:order.id,
        user:order.user.name,
        email:order.user.email,
        status:order.status.toUpperCase(),
        total:formatter.format(order.total),
        shippingAddress:order.shipping_address,
        createdAt:format(order.created_at, "MMM do,yyyy")
      }));
      setOrders(formattedOrders)
    });
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <OrderClient
          data={orders}
          loading={ isPending}
        />
      </div>
    </div>
  )
}