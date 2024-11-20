import NavbarSidebar from "./NavbarSidebar";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthLayout = () => {
  // Add authentication check logic here
  const isAuthenticated = true; // Replace with your actual auth check
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <NavbarSidebar>
      <Outlet />
    </NavbarSidebar>
  );
};

export default AuthLayout;
