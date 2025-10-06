import {Route, Routes} from 'react-router-dom'
import AuthLayout from "./AuthLayout";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/register";
import NewVerification from "@/pages/auth/new-verification";
import ErrorLayout from "./ErrorLayout";
import Error404Page from "@/components/errors/Error404";
import Error500Page from "@/components/errors/Error500";
import MainLayout from "./MainLayout";
import Error500 from "@/components/errors/Error500";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/dashboard/dashboard.tsx";
import {RemoveTrailingSlash} from "@/components/remove-trailing-slash";
import Categories from "@/pages/admin/categories";
import CategoryPage from "@/pages/admin/categories/categoryId";
import Products from "@/pages/admin/products";
import ProductPage from "@/pages/admin/products/productId";
import OrdersPage from "@/pages/admin/orders";
import OrderPage from "@/pages/admin/orders/orderId";
import DashboardPage from "@/pages/dashboard";
import ProductSlugPage from "@/pages/products";
import CartPage from "@/pages/cart";
import {CheckoutPage} from "@/pages/checkout";
import {PaymentReturn} from "@/pages/payment-return";
import CollectionsPage from "@/pages/collections";

const Layout = () => {

  return (
    <>
      <RemoveTrailingSlash/>
      <Routes>
        <Route path={'/errors/:path?'} Component={ErrorLayout}>
          <Route index Component={Error404Page}/>
          <Route path={'error500'} Component={Error500Page}/>
        </Route>
        <Route path={'/auth/:path?'} Component={AuthLayout}>
          {/*<AuthLayout>*/}
          <Route index Component={LoginPage}/>
          <Route path={'login'} Component={LoginPage}/>
          <Route path={'register'} Component={SignupPage}/>
          <Route path={'verify-email/:id'} Component={NewVerification}/>
          {/*</AuthLayout>*/}
        </Route>
        {/*checkout*/}
        <Route path={"/checkout"} Component={CheckoutPage}/>
        <Route path={'return'} Component={AuthLayout}>
          <Route index Component={PaymentReturn}/>
        </Route>
        {/*checkout*/}
        <Route path={'/'} Component={MainLayout}>
          {/*<MainLayout>*/}
          <Route index Component={DashboardPage}/>
          <Route path={"/products/:slug"} Component={ProductSlugPage}/>
          <Route path={"/cart"} Component={CartPage}/>
          <Route path={'/error'} Component={Error500}/>
          <Route path={"/collections/:params"} Component={CollectionsPage}/>
          {/*</MainLayout>*/}
        </Route>
        <Route path={'/admin/:path?'} Component={AdminLayout}>
          {/*<AdminLayout>*/}
          <Route index Component={Dashboard}/>
          <Route path={'dashboard'} Component={Dashboard}/>
          <Route path={'products'} Component={Products}/>
          <Route path={'products/:id'} Component={ProductPage}/>
          <Route path={'categories'} Component={Categories}/>
          <Route path={'categories/:id'} Component={CategoryPage}/>
          <Route path={'orders'} Component={OrdersPage}/>
          <Route path={'orders/:id'} Component={OrderPage}/>
          <Route path={'payments'} Component={Dashboard}/>
          <Route path={'review'} Component={Dashboard}/>
          {/*</AdminLayout>*/}
        </Route>
      </Routes>
    </>
  )
}

export default Layout;