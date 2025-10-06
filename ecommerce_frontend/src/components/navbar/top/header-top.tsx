import {Link} from "react-router-dom";

import {ShoppingCart} from "lucide-react";
import {SearchBox} from "@/components/navbar/top/search-box.tsx";
import {UserButton} from "@/components/auth/user-button.tsx";
import {useAppContext} from "@/hooks/use-app-context.ts";

import Logo from "@/assets/logo-web-white-xgear.webp";
import Chat from "@/assets/icons8-ringer-volume-30.webp";

export const HeaderTop = () => {
  const {cart} = useAppContext();
  return (
    <>
      <header className=" z-[100] sticky left-0 top-0 w-full bg-primary-foreground">
        <div className="bg-destructive py-[5px]">
          <div className="container max-w-7xl flex justify-between mr-auto ml-auto pl-[15px] pr-[15px] relative">
            <div className="w-[25%] ">
              <Link to="/">
                <img src={Logo} alt="Xgear" className="h-auto max-h-[60px] max-w-[100%] align-middle ml-auto mr-auto"/>
              </Link>
            </div>
            <div className="relative flex items-center w-[35%]">
              <SearchBox/>
            </div>
            <div className="flex items-center w-[40%]">
              <ul className="flex flex-1 justify-end gap-x-2">
                <li className="flex items-center">
                  <Link to="" className="relative flex flex-wrap items-center text-white">
                      <span className="flex-none basis-[30px] relative w-[30px]">
                        <img width={24} height={24} src={Chat} alt="Chat icon"/>
                      </span>
                    <span className="flex-none basis-[calc(100%-30px)] text-sm text-left hidden sm:block">
                        Hotline
                        <span className="block">0325549876</span>
                      </span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <UserButton/>
                  {/*User*/}

                </li>
                <li className="flex items-center">
                  <button
                    className="flex flex-wrap items-center text-white border-2 px-2 py-2  rounded-md cursor-pointer max-lg:border-none">
                      <span className="flex-none basis-[30px] relative w-[30px]">
                        <ShoppingCart/>
                        <span
                          className="bg-destructive text-white text-xs font-semibold absolute w-4 h-4 rounded-full text-center right-[5px] bottom-[12px]">{cart.quantity ?? 0}</span>
                      </span>
                    <span className="flex-none text-sm max-lg:hidden bg">Giỏ hàng</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}