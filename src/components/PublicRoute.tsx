import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

interface PublicRouteProps {
  element: React.ReactElement;
  redirectTo: string;
  type?: "user" | "admin";
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  element,
  redirectTo,
  type = "user",
}) => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo?.adminInfo
  );

  const isAuthenticated = type === "user" ? userInfo : adminInfo;
  const redirectPath = type === "user" ? redirectTo : "/dashboard";

  return isAuthenticated ? <Navigate to={redirectPath} replace /> : element;
};

export default PublicRoute;
