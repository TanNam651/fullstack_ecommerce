import {CartForm} from "@/pages/cart/components/cart-form.tsx";
import {useAppContext} from "@/hooks/use-app-context.ts";

export default function CartPage() {
  const {cart} = useAppContext()

  return (
    <>
      <CartForm cart={cart}/>
    </>
  )
}