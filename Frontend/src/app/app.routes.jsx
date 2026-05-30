import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx";
import CreateProducts from "../features/products/pages/CreateProducts.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>,
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
        path: "/seller/create-product",
        element: <CreateProducts />,
    },

]);

export default routes;