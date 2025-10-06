// import {useSelector} from "react-redux";
// import {useEffect} from "react";
// import {RootState} from "@/reducers";

import {useSelector} from "react-redux";
import {RootState} from "@/reducers";
import {ChevronDown, User2} from "lucide-react";

export const UserButton = () => {
  const auth = useSelector((state: RootState) => state.app);
  return (
    <>
      <div>
        <button className="flex flex-wrap items-center text-white">
          <span className="flex-none basis-[30px] relative w-[30px] ">
            <User2 className="w-[24px] h-[24px]"/>
          </span>
          <span className="flex-none text-nowrap basis-[calc(100%-30px)] text-sm hidden sm:block">
            Đăng nhập
          <span className="flex">
            Đăng ký <ChevronDown className="w-[18px]"/></span>
          </span>
        </button>
      </div>
    </>
  )
}