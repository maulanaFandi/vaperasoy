// import React from "react";
// import { createBrowserRouter, redirect } from "react-router-dom";
// import Layout from "./layout/layout.jsx";
// import Login from "./pages/login.jsx";
// import Home from "./pages/home.jsx";
// import Product from "./pages/products.jsx";
// import AddPoduct from "./pages/add-products.jsx";
// import Staff from "./pages/staff.jsx";
// import AddStaff from "./pages/addStaff.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     loader: () => redirect("/dashboard"),
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     loader: () => localStorage.getItem("access_token") && redirect("/"),
//   },
//   {
//     // loader: () => !localStorage.getItem("access_token") && redirect("/login"),
//     children: [
//       {
//         element: <Layout />,
//         children: [
//           {
//             path: "/dashboard",
//             element: <Home />,
//           },
//           {
//             path: "/products",
//             element: <Product />,
//           }
//           ,
//           {
//             path: "/add-products",
//             element: <AddPoduct />,
//           },
//           {
//             path: "/staff",
//             element: <Staff />,
//           },
//           {
//             path: "/add-staff",
//             element: <AddStaff />,
//           }
//         ],
//       },
//     ],
//   },
// ]);

// export default router;

import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./layout/layout.jsx";
// import PublicPage from "./pages/publicPage.jsx";
// import CMSPage from "./pages/cmsPage.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Product from "./pages/products.jsx";
import {jwtDecode} from "jwt-decode";

const isAuthenticated = () => localStorage.getItem("access_token");

const decodeAccessToken = (accessToken) => {
  return jwtDecode(accessToken);
};

const isAdmin = () => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    const decodedToken = decodeAccessToken(accessToken);
    return decodedToken.role === "admin";
  } else {
    return false;
  }
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () =>
      isAuthenticated()
        ? isAdmin()
          ? redirect("/dashboard")
          : redirect("/public")
        : redirect("/login"),
  },
  // {
  //   path: "/public",
  //   element: <PublicPage />,
  //   children: [
  //     {
  //       path: "/products",
  //       element: <Layout />,
  //       children: [
  //         {
  //           path: "/products",
  //           element: <PublicPage />,
  //         },
  //       ],
  //     }
  //   ]
  // },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/dashboard/products",
        element: <Product />,
      },
    ],
  },
]);

// Fungsi untuk mendekode token. Anda perlu menggantinya dengan fungsi yang sesuai dengan library atau implementasi Anda.

export default router;
