import React, { useState, ReactNode } from "react";
import {
  Menu,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  DollarSign,
  Users,
  RefreshCw,
  Settings,
  Shield,
  Briefcase,
  Key,
  PiggyBank,
  Receipt,
  CircleDollarSign,
  FileText,
  Calendar,
  LogOut,
  Wallet,
  X,
  Loader2,
} from "lucide-react";
import { adminLogout } from "@/api/user";
import { useDispatch } from "react-redux";
import { removeAdminInfo } from "@/redux/slices/adminSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarSidebarProps {
  children: ReactNode;
}

interface SidebarItem {
  icon: ReactNode;
  text: string;
  path: string;
}

const NavbarSidebar: React.FC<NavbarSidebarProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isProfileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    { icon: <DollarSign size={20} />, text: "Dashboard", path: "/dashboard" },
    { icon: <Users size={20} />, text: "Borrowers", path: "/dashboard" },
    { icon: <DollarSign size={20} />, text: "Loans", path: "/dashboard" },
    { icon: <RefreshCw size={20} />, text: "Repayments", path: "/dashboard" },
    {
      icon: <Settings size={20} />,
      text: "Loan Parameters",
      path: "/dashboard",
    },
    { icon: <DollarSign size={20} />, text: "Accounting", path: "/dashboard" },
    { icon: <Shield size={20} />, text: "Collateral", path: "/dashboard" },
    {
      icon: <Key size={20} />,
      text: "Access Configuration",
      path: "/dashboard",
    },
    { icon: <PiggyBank size={20} />, text: "Savings", path: "/dashboard" },
    {
      icon: <Briefcase size={20} />,
      text: "Other Incomes",
      path: "/dashboard",
    },
    { icon: <Receipt size={20} />, text: "Payroll", path: "/dashboard" },
    {
      icon: <CircleDollarSign size={20} />,
      text: "Expenses",
      path: "/dashboard",
    },
    { icon: <FileText size={20} />, text: "E-Signature", path: "/dashboard" },
    {
      icon: <DollarSign size={20} />,
      text: "Member Accounts",
      path: "/dashboard",
    },
    { icon: <Calendar size={20} />, text: "Calendar", path: "/dashboard" },
    { icon: <Settings size={20} />, text: "Settings", path: "/dashboard" },
  ];

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await adminLogout();
      dispatch(removeAdminInfo());
      toast.success("Admin Logout Success");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed lg:static lg:translate-x-0 h-full bg-[#0F4C3A] text-white w-64 transition-transform duration-300 ease-in-out flex flex-col z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-xl font-bold border-b border-[#1a6e54] flex items-center justify-between">
          <div className="flex items-center">
            <Wallet size={24} className="mr-2" />
            <span>Credit App</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden hover:bg-[#1a6e54] p-1 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#1a6e54] hover:text-white transition-colors ${
                location.pathname === item.path ? "bg-[#1a6e54] text-white" : ""
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.text}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[#1a6e54] p-4">
          <div className="flex items-center text-gray-300">
            <User size={20} />
            <span className="ml-3">Version 1.0</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white text-[#0F4C3A] h-16 flex items-center justify-between px-4 shadow-md sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <MessageSquare size={20} />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                <User size={20} />
                <span>Admin</span>
                <ChevronDown size={16} />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {}}
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <LogOut size={20} />
              )}
              {isLoading ? <span>Logging out...</span> : <span>Logout</span>}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-100 p-6 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavbarSidebar;
