import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import React from "react";
import {ProductStore} from "@/helpers/types.ts";
import {formatter} from "@/helpers/utils.ts";
import {useAppContext} from "@/hooks/use-app-context.ts";
import {cn} from "@/lib/utils.ts";

interface CartProductItemProps {
  product: ProductStore;
  disable?: boolean
}

export const CartProductItem: React.FC<CartProductItemProps> = ({
                                                                  product,
                                                                  disable = false
                                                                }) => {
  const {cartDispatch} = useAppContext();

  return (
    <>
      <ul className="flex flex-wrap justify-between items-center py-2.5 border-b border-b-primary/15">
        <li className="w-full flex flex-[0_0_60%] max-w-[60%] max-md:max-w-full max-md:flex-[0_0_100%]">
          <div className="relative max-w-20">
            {!disable ? (
              <Link to={`/products/${product.slug}`}>
                <img src={product.img}
                     alt={product.name} className="align-middle"/>
                <span
                  className="absolute px-2 py-1 -top-2 -right-2 bg-primary/50 text-white text-center text-xs font-semibold rounded-full">{product.quantity}</span>
              </Link>
            ) : (
              <>
                <div className="border rounded-md p-2">
                  <img src={product.img}
                       alt={product.name} className="align-middle"/>
                  <span
                    className="absolute px-2 py-1 -top-2 -right-2 bg-primary/50 text-white text-center text-xs font-semibold rounded-full">{product.quantity}</span>
                </div>
              </>
            )}
          </div>
          <div className="relative ml-3.5">
            {!disable ? (
              <Link to={`/products/${product.slug}`}
              >
                <p className="text-ellipsis line-clamp-2 hover:text-destructive transition-colors">
                  {product.name}
                </p>
              </Link>
            ) : (
              <p className="text-ellipsis line-clamp-2">
                {product.name}
              </p>
            )}

            <div>
              <span className="mr-2.5 mt-1.5 text-sm">Giá sốc</span>
              <span
                className={cn("mr-2.5 mt-1.5 text-sm ", disable ? "" : "text-destructive")}>{formatter.format(product.total)}</span>
            </div>
          </div>
        </li>
        {!disable && (
          <li
            className="flex flex-[0_0_20%] flex-col justify-center items-center text-center max-md:max-w-[50%] max-md:flex-row max-md:flex-[0_0_50%] max-md:mt-2.5">
            <div className="relative flex w-fit">
              <Button
                type="button"
                variant="secondary"
                className="w-10 h-10 bg-transparent hover:bg-transparent rounded-none border cursor-pointer text-primary text-xl"
                onClick={() => {
                  if (product.quantity > 1) {
                    cartDispatch({type: "UPDATE_CART", payload: {productId: product.id, product: {quantity: -1}}})
                  }
                }}
              >
                <Minus/>
              </Button>
              <Input type="text" disabled name={product.id}
                     className="w-10 h-10 rounded-none border disabled:text-primary disabled:border-primary/15 disabled:opacity-100 border-l-0 border-r-0 text-center text-sm p-0 font-semibold"
                     value={product.quantity}/>
              <Button
                type="button"
                variant="secondary"
                className="w-10 h-10 bg-transparent hover:bg-transparent rounded-none border cursor-pointer text-primary text-xl"
                onClick={() => {
                  cartDispatch({type: "UPDATE_CART", payload: {productId: product.id, product: {quantity: 1}}})
                }}
              >
                <Plus/>
              </Button>
            </div>
            <div className="w-fit">
              <Button
                type="button"
                variant="link"
                className="cursor-pointer hover:no-underline"
                onClick={() => {
                  cartDispatch({type: "DELETE_CART", payload: {productId: product.id}})
                }}
              >
                Xóa
              </Button>
            </div>
          </li>
        )}
        <li className="flex-[0_0_20%] text-right max-md:max-w-[50%] max-md:flex-[0_0_50%] max-md:mt-2.5">
          <span
            className={cn(disable ? "font-normal" : "text-destructive font-semibold")}>{formatter.format(product.total)}</span>
        </li>
      </ul>
    </>
  )
}