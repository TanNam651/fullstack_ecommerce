import React from "react";
import {ListCartProduct} from "@/pages/cart/components/list-cart-product.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Reply} from "lucide-react";

import {Cart} from "@/helpers/types.ts";
import {formatter} from "@/helpers/utils.ts";
import {useNavigate} from "react-router-dom";

interface CartFormProps {
  cart: Cart;
}

export const CartForm: React.FC<CartFormProps> = ({
                                                    cart
                                                  }) => {
  const navigate = useNavigate();

  return (
    <section className=" relative mt-3.5">
      <div className="container max-w-7xl mr-auto ml-auto px-3.5">
        <div className="relative grid grid-flow-col grid-col-3 max-md:grid-flow-row max-md:grid-cols-1">
          <div className="col-span-2 max-md:col-span-1">
            <div className="bg-white p-3.5 rounded-md">
              <div className="flex items-center justify-between border-b border-primary/30 pb-3.5">
                <h2 className="text-xl font-semibold">Giỏ hàng:</h2>
                <span className="border-b border-primary/30 space-x-1 text-sm font-normal text-primary/80">
                  <span>{cart.quantity}</span>
                  <span>Sản phẩm</span>
                </span>
              </div>
              <div>
                <ListCartProduct products={cart.products}/>
              </div>
            </div>
          </div>
          <div className="col-span-1 pl-3.5 max-md:pl-0 max-md:mt-2.5">
            <div className="bg-white rounded-md p-3.5 ">
              <div>
                <h2 className="text-xl font-semibold mb-2.5">Thông tin đơn hàng</h2>
              </div>
              <div className="py-3.5 border-t border-b">
                <p className="flex font-bold text-base justify-between">Tổng tiền: <span
                  className="text-destructive text-xl">{formatter.format(cart.total)}</span></p>
              </div>
              <div className="my-3.5">
                <Label htmlFor="order-notes" className="mb-2">Ghi chú đơn hàng</Label>
                <Textarea id="order-notes" name="order-notes" className="rounded-none"/>
              </div>
              <div>
                <Button
                  disabled={cart.total === 0}
                  variant="default"
                  className="w-full rounded-xs cursor-pointer"
                  onClick={() => navigate("/checkout")}
                >
                  THANH TOÁN NGAY
                </Button>
                <Button
                  variant="link"
                  className="w-full cursor-pointer hover:text-destructive hover:no-underline"
                  onClick={() => navigate("/")}
                >
                  <Reply/>
                  Tiếp tục mua hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}