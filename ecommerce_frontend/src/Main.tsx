import AppContext from "@/context/context";
import React, {useReducer} from "react";
import {configReducer} from "@/reducers/configReducer";
import {Cart, Setting} from "@/helpers/types.ts";
import {getCartFromStore} from "@/helpers/utils.ts";
import {cartReducer} from "@/reducers/cartReducer.ts";

const Main = ({children}: { children: React.ReactNode }) => {
  const configState: Setting = {
    isDark: false
  }

  const cartsStore: Cart = getCartFromStore();

  const [settings, configDispatch] = useReducer(configReducer, configState);
  const [cart, cartDispatch] = useReducer(cartReducer, cartsStore);

  return (
    <AppContext.Provider value={{settings, configDispatch, cart, cartDispatch}}>
      {children}
    </AppContext.Provider>
  )
}


export default Main;