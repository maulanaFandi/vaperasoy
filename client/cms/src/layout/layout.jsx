import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
export default function Layout() {
  return (
    <>
    <div style={{ display: "flex" }}>
      <Navbar />
      <Outlet />
    </div>
    </>
  );
}
