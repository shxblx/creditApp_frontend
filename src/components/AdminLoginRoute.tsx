import Login from "@/pages/Login";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminLoginRoute: React.FC = () => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo?.adminInfo
  );
  return adminInfo ? <Navigate to="/dashboard" replace /> : <Login />;
};

export default AdminLoginRoute;
