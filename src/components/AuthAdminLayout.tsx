import React from "react";
import NavbarSidebar from "./NavbarSidebar";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const AuthAdminLayout: React.FC = () => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo?.adminInfo
  );
  const location = useLocation();

  if (!adminInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <NavbarSidebar>
      <Outlet />
    </NavbarSidebar>
  );
};

export default AuthAdminLayout;
