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
} from "lucide-react";
import { adminLogout } from "@/api/user";
import { useDispatch } from "react-redux";
import { removeAdminInfo } from "@/redux/slices/adminSlice";
import toast from "react-hot-toast";

interface NavbarSidebarProps {
  children: ReactNode;
}

interface SidebarItem {
  icon: ReactNode;
  text: string;
}

const NavbarSidebar: React.FC<NavbarSidebarProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isProfileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);

  const sidebarItems: SidebarItem[] = [
    { icon: <DollarSign size={20} />, text: "Dashboard" },
    { icon: <Users size={20} />, text: "Borrowers" },
    { icon: <DollarSign size={20} />, text: "Loans" },
    { icon: <RefreshCw size={20} />, text: "Repayments" },
    { icon: <Settings size={20} />, text: "Loan Parameters" },
    { icon: <DollarSign size={20} />, text: "Accounting" },
    { icon: <Shield size={20} />, text: "Collateral" },
    { icon: <Key size={20} />, text: "Access Configuration" },
    { icon: <PiggyBank size={20} />, text: "Savings" },
    { icon: <Briefcase size={20} />, text: "Other Incomes" },
    { icon: <Receipt size={20} />, text: "Payroll" },
    { icon: <CircleDollarSign size={20} />, text: "Expenses" },
    { icon: <FileText size={20} />, text: "E-Signature" },
    { icon: <DollarSign size={20} />, text: "Member Accounts" },
    { icon: <Calendar size={20} />, text: "Calendar" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = async () => {
    await adminLogout();
    dispatch(removeAdminInfo());
    toast.success("Admin Logout Success");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:translate-x-0 h-full bg-[#0F4C3A] text-white w-64 transition-transform duration-300 ease-in-out flex flex-col z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* App Logo and Title */}
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

        {/* Navigation Items */}
        <nav className="mt-4 flex-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-[#1a6e54] hover:text-white transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.text}</span>
            </a>
          ))}
        </nav>

        {/* Bottom Sidebar Section */}
        <div className="border-t border-[#1a6e54] p-4">
          <div className="flex items-center text-gray-300">
            <User size={20} />
            <span className="ml-3">Version 1.0</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="bg-white text-[#0F4C3A] h-16 flex items-center justify-between px-4 shadow-md sticky top-0 z-10">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Right side */}
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

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavbarSidebar;
