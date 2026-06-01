import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProducts from "../features/products/pages/CreateProducts.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetail from "../features/products/pages/ProductDetail.jsx";
import SellerProductDetail from "../features/products/pages/SellerProductDetail.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: <Protected role="seller"><CreateProducts /></Protected>,
      },
      {
        path: "/seller/dashboard",
        element: <Protected role="seller"><Dashboard /></Protected>,
      },
      {
        path: "/seller/product/:id",
        element: <Protected role="seller"><SellerProductDetail /></Protected>,
      },
    ],
  },
]);

export default routes;
