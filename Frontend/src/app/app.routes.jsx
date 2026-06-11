import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProducts from "../features/products/pages/CreateProducts.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import SellerProductDetail from "../features/products/pages/SellerProductDetail.jsx";
import Cart from "../features/cart/pages/Cart.jsx";
import AppLayout from "./AppLayout.jsx";
import OrderSuccess from "../features/cart/pages/OrderSuccess.jsx";

const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "/order-success",
        element: (
            <OrderSuccess />
        ),
      },
      {
        path: "/seller",
        children: [
          {
            path: "/seller/create-product",
            element: (
              <Protected role="seller">
                <CreateProducts />
              </Protected>
            ),
          },
          {
            path: "/seller/dashboard",
            element: (
              <Protected role="seller">
                <Dashboard />
              </Protected>
            ),
          },
          {
            path: "/seller/product/:id",
            element: (
              <Protected role="seller">
                <SellerProductDetail />
              </Protected>
            ),
          },
        ],
      },
    ],
  },
]);

export default routes;
