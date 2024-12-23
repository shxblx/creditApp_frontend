import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import AuthAdminLayout from "../components/AuthAdminLayout";
import PublicRoute from "@/components/PublicRoute";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import MainHome from "@/pages/MainHome";

export const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<PublicRoute element={<Login />} redirectTo="/mainhome" />}
      />
      <Route
        path="/signup"
        element={<PublicRoute element={<SignUp />} redirectTo="/mainhome" />}
      />
      <Route
        path="/mainhome"
        element={
          <AuthenticatedRoute element={<MainHome />} redirectTo="/login" />
        }
      />
      <Route element={<AuthAdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
