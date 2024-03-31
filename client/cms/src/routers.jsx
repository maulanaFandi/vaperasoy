import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "./layout/layout.jsx";
import LayoutUser from "./layout/layoutUser.jsx";
import Login from "./pages/login.jsx";

// CMS
import Dashboard from "./pages/cms/dashboard.jsx";
import Product from "./pages/cms/products.jsx";
import Staff from "./pages/cms/staff.jsx";
import ListUser from "./pages/cms/listUser.jsx";
import AddPoduct from "./pages/cms/add-products.jsx";
import AddStaff from "./pages/cms/addStaff.jsx";
import Register from "./pages/register.jsx";

// USER
import Home from "./pages/public/home.jsx";
import UserHome from "./pages/public/userHome.jsx";
import UserProducts from "./pages/public/userProducts.jsx";
import UserDetailProducts from "./pages/public/userDetailProduct.jsx";
import UserProfile from "./pages/public/userProfile.jsx";
import UserCart from "./pages/public/userCart.jsx";

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

const isNotCompleteData = () => {
  const accessToken = localStorage.getItem("access_token");
  const decodedToken = decodeAccessToken(accessToken);
  console.log(decodedToken);

  // Check setiap field data pengguna
  const incompleteFields = [];
  if (!decodedToken.name) incompleteFields.push("Name");
  if (!decodedToken.birthDate) incompleteFields.push("Birth Date");
  if (!decodedToken.IDNumber) incompleteFields.push("ID Number");
  if (!decodedToken.address) incompleteFields.push("Address");
  if (!decodedToken.phoneNumber) incompleteFields.push("Phone Number");
  if (!decodedToken.gender) incompleteFields.push("Gender");

  return incompleteFields;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    loader: () =>
      isAuthenticated()
        ? isAdmin()
          ? redirect("/cms/dashboard")
          : redirect("/products")
        : redirect("/public"),
  },
  {
    element: <LayoutUser />,
    children: [
      {
        path: "/public",
        element: <Home />,
      },
      {
        loader: () =>
          isAuthenticated()
            ? isNotCompleteData()
              ? redirect("/profile")
              : redirect("/products")
            : !isAuthenticated()
            ? redirect("/")
            : null,
        path: "/home",
        element: <UserHome />,
      },
      {
        path: "/products",
        element: <UserProducts />,
      },
      {
        path: "/products/:id",
        element: <UserDetailProducts />,
      },
      {
        path: "/cart",
        element: <UserCart />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    loader: () => (!isAdmin() ? redirect("/") : null),
    element: <Layout />,
    children: [
      {
        path: "/cms/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cms/products",
        element: <Product />,
      },
      {
        path: "/cms/staff",
        element: <Staff />,
      },
      {
        path: "/cms/users",
        element: <ListUser />,
      },
      {
        path: "/cms/add-products",
        element: <AddPoduct />,
      },
      {
        path: "/cms/add-staff",
        element: <AddStaff />,
      },
    ],
  },
]);

export default router;
