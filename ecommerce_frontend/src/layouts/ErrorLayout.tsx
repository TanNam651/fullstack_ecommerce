import {Outlet} from "react-router-dom";

const ErrorLayout =()=>{
return (
    <div className="bg-red-50">
        <Outlet/>
    </div>
)
}

export default ErrorLayout;