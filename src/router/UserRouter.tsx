import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import AuthLayout from "../components/AuthLayout";
import PublicRoute from "@/components/PublicRoute";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";

export const UserRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<PublicRoute element={<Login />} redirectTo="/dashboard" />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <AuthenticatedRoute element={<AuthLayout />} redirectTo="/login" />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
