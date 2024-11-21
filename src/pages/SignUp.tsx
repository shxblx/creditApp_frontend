import React, { useEffect, useState } from "react";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo?.adminInfo
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/mainhome");
    }
  }, [adminInfo, userInfo, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      if (name === "password") {
        setPasswordMatchError(value !== formData.confirmPassword);
      } else {
        setPasswordMatchError(value !== formData.password);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await signup(formData);
      if (response.status === 200) {
        dispatch(
          setUserInfo({
            user: "User",
            userId: response.data.userId,
          })
        );
        navigate("/mainhome");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex items-center justify-center space-x-2">
          <Wallet className="h-8 w-8 text-[#1A4D2E]" />
          <span className="text-2xl font-bold text-gray-800">Credit App</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join us and start your journey
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-4 shadow-sm rounded-lg sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] sm:text-sm"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] sm:text-sm pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] sm:text-sm pr-10 ${
                    passwordMatchError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordMatchError && (
                <p className="mt-1 text-sm text-red-600">
                  Passwords do not match
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1A4D2E] hover:bg-[#153d25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A4D2E] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-sm text-center">
              <Link to="/login">
                <span className="text-gray-600">Already have an account? </span>
                <a
                  href="#"
                  className="font-medium text-[#1A4D2E] hover:text-[#153d25]"
                >
                  Sign in
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
