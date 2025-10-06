import {ProductStore} from "@/helpers/types.ts";
import React from "react";
import {CartProductItem} from "@/pages/cart/components/cart-product-item.tsx";
import {Link} from "react-router-dom";

interface ListCartProductProps {
  products: ProductStore[];
}

export const ListCartProduct: React.FC<ListCartProductProps> = ({
                                                                  products
                                                                }) => {
  return (
    <>
      <div className="relative">
        {products.length > 0 ? (products.map((product) => (
          <div className="mt-2">
            <CartProductItem key={product.name} product={product} disable={false}/>
          </div>
        ))) : (
          <div>
            <p className="my-5 text-center">
              Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm
              <Link to="/" className="text-destructive font-semibold ml-1">
                tại đây.
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  )
}