import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./app.routes.jsx";
import { useSelector } from "react-redux";
import useAuth from "../features/auth/hook/useAuth.js";

const App = () => {
  const { handleGetUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(user);
  return (
    // <Provider store={store}>
    <RouterProvider router={routes} />
    // </Provider>
  );
};

export default App;
