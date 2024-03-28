import { Outlet } from "react-router-dom";
import NavbarUser from "../components/navbarUser.jsx";
export default function LayoutUser() {
  return (
    <>
    <div style={{ display: "flex" }}>
      <NavbarUser />
      <Outlet />
    </div>
    </>
  );
}
