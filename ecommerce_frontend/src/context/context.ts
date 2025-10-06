import React, {createContext} from "react";
import {Cart, Setting} from "@/helpers/types.ts";
import {ConfigAction} from "@/reducers/configReducer.ts";
import {CartAction} from "@/reducers/cartReducer.ts";

interface AppContextType {
  settings: Setting;
  // setSettings: React.Dispatch<React.SetStateAction<Setting>>;
  cart: Cart;
  // setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
  configDispatch: React.Dispatch<ConfigAction>;
  cartDispatch: React.Dispatch<CartAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export default AppContext;