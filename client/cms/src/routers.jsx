import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import AddPoduct from "./pages/add-products.jsx";
import Staff from "./pages/staff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/products"),
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => localStorage.getItem("access_token") && redirect("/"),
  },
  {
    // loader: () => !localStorage.getItem("access_token") && redirect("/login"),
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/products",
            element: <Home />,
          },
          {
            path: "/add-products",
            element: <AddPoduct />,
          },
          {
            path: "/staff",
            element: <Home />,
          }
        ],
      },
    ],
  },
]);

export default router;
