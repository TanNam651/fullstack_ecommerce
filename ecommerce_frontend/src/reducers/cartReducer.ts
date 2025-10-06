import {Cart, ProductStore} from "@/helpers/types.ts";
import {removeLocal, setLocal} from "@/helpers/utils.ts";


export type CartAction =
  | {
  type: "ADD_CART",
  payload: { product: ProductStore }
}
  | {
  type: "UPDATE_CART",
  payload: { productId: string, product: Partial<ProductStore> }
}
  | {
  type: "DELETE_CART",
  payload: { productId: string }
} | {
  type: "RESET_CART"
}

export const cartReducer = (state: Cart, action: CartAction) => {
  switch (action.type) {
    case "ADD_CART": {
      const quantity = (state?.quantity ?? 0) + action.payload.product.quantity;
      const total = (state?.total ?? 0) + (action.payload.product.quantity * action.payload.product.total);

      const cart = state?.products?.length ? {
        ...state,
        products: [
          ...state.products,
          action.payload.product
        ],
        total: total,
        quantity: quantity
      } : {
        products: [action.payload.product],
        total: total,
        quantity: quantity
      };

      setLocal("cart", JSON.stringify(cart));
      return cart;
    }


    case "UPDATE_CART": {
      let quantity = 0;
      let total = 0;
      const newProducts = state.products.map((product) => {
        if (product.id === action.payload.productId) {
          const newQuantity = action.payload.product.quantity ?? product.quantity;
          return {
            ...product,
            quantity: product.quantity + newQuantity,
          }
        }
        return product;
      });
      for (const product of newProducts) {
        quantity += product.quantity;
        total += (product.total * product.quantity);
      }
      const cart = {
        ...state,
        products: newProducts,
        total: total,
        quantity: quantity
      }
      setLocal("cart", JSON.stringify(cart))
      return cart;
    }

    case "DELETE_CART": {
      let total = 0;
      let quantity = 0;
      const newProducts = state.products.filter((product) => product.id !== action.payload.productId);
      for (const product of newProducts) {
        quantity += product.quantity;
        total += (product.total * product.quantity);
      }
      const cart = {
        ...state,
        products: newProducts,
        total: total,
        quantity: quantity
      }
      setLocal("cart", JSON.stringify(cart));
      return cart;
    }

    case "RESET_CART": {
      removeLocal('cart');
      return {
        products: [],
        total: 0,
        quantity: 0
      };
    }
    default:
      return state;
  }
}