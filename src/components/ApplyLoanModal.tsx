import React, { useState, useEffect } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { getLoan } from "@/api/user";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

interface ApplyLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoanApplied?: () => void;
}

const ApplyLoanModal: React.FC<ApplyLoanModalProps> = ({
  isOpen,
  onClose,
  onLoanApplied,
}) => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: userInfo.userId,
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress: "",
    termsAccepted: false,
    creditInfoConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const modalContent = document.getElementById("loan-modal-content");
      if (
        modalContent &&
        !modalContent.contains(e.target as Node) &&
        !isLoading
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, isLoading]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const loanAmount = parseFloat(formData.loanAmount);
    if (isNaN(loanAmount) || loanAmount < 1000) {
      newErrors.loanAmount = "Minimum loan amount is $1,000";
    }

    if (!formData.loanTenure) {
      newErrors.loanTenure = "Loan tenure is required";
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required";
    }

    if (!formData.reasonForLoan.trim()) {
      newErrors.reasonForLoan = "Reason for loan is required";
    }

    if (!formData.employmentAddress.trim()) {
      newErrors.employmentAddress = "Employment address is required";
    }

    if (!formData.termsAccepted || !formData.creditInfoConsent) {
      newErrors.terms = "You must accept both terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Disable form submission and show loading state
    setIsLoading(true);

    try {
      const response = await getLoan(formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        if (onLoanApplied) {
          onLoanApplied();
        }
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to submit loan application");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        id="loan-modal-content"
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1A4D2E]">
            Apply for Loan
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* First Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name as it appears on bank account
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Tenure (Months)
                </label>
                <select
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Loan Tenure</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                </select>
                {errors.loanTenure && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.loanTenure}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Loan
                </label>
                <textarea
                  name="reasonForLoan"
                  value={formData.reasonForLoan}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.reasonForLoan && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reasonForLoan}
                  </p>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  disabled={isLoading}
                  min="1000"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.loanAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.loanAmount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Status
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Employment Status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="freelance">Freelance</option>
                  <option value="student">Student</option>
                  <option value="unemployed">Unemployed</option>
                </select>
                {errors.employmentStatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employmentStatus}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Address
                </label>
                <textarea
                  name="employmentAddress"
                  value={formData.employmentAddress}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A4D2E] focus:border-[#1A4D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.employmentAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employmentAddress}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions (Full Width) */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                disabled={isLoading}
                className="h-4 w-4 text-[#1A4D2E] focus:ring-[#1A4D2E] border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I have read the important information and accept that by
                completing the application I will be bound by terms.
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="creditInfoConsent"
                checked={formData.creditInfoConsent}
                onChange={handleChange}
                disabled={isLoading}
                className="h-4 w-4 text-[#1A4D2E] focus:ring-[#1A4D2E] border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Any personal and credit information obtained may be disclosed
                from time to time to other lenders, credit bureaus or other
                credit reporting agencies.
              </label>
            </div>
            {errors.terms && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.terms}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#1A4D2E] text-white rounded-md hover:bg-[#153d25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoanModal;
