import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Product from "./pages/products.jsx";
import AddPoduct from "./pages/add-products.jsx";
import Staff from "./pages/staff.jsx";
import AddStaff from "./pages/addStaff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
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
            path: "/dashboard",
            element: <Home />,
          },
          {
            path: "/products",
            element: <Product />,
          }
          ,
          {
            path: "/add-products",
            element: <AddPoduct />,
          },
          {
            path: "/staff",
            element: <Staff />,
          },
          {
            path: "/add-staff",
            element: <AddStaff />,
          }
        ],
      },
    ],
  },
]);

export default router;
