import { useState, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  User,
  Search,
  DollarSign,
  CircleDollarSign,
  Wallet,
  Eye,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { removeUserInfo } from "@/redux/slices/userSlice";
import { logout, fetchLoan } from "@/api/user";
import toast from "react-hot-toast";
import ApplyLoanModal from "@/components/ApplyLoanModal";

interface Loan {
  _id: string;
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  employmentAddress: string;
  reasonForLoan: string;
  loanStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const formatToINR = (amount: string) => {
  const numAmount = parseFloat(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numAmount);
};

const MainHome = () => {
  const [amount] = useState("0.0");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isApplyLoanModalOpen, setIsApplyLoanModalOpen] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);

  const loadLoans = async () => {
    try {
      setIsLoading(true);
      if (userInfo?.userId) {
        const response = await fetchLoan(userInfo.userId);
        setLoans(Array.isArray(response.data.loans) ? response.data.loans : []);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to fetch loans");
      setLoans([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadLoans();
  }, [userInfo?.userId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "disbursed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeUserInfo());
      toast.success("Logout Success");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanAmount.includes(searchTerm) ||
      loan.loanStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (showDropdown) {
      const handleClickOutside = () => setShowDropdown(false);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <div className="text-xl font-bold text-[#1A4D2E]">Credit App</div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[#1A4D2E] hover:text-[#153d25] text-sm"
              >
                Home
              </a>
              <a
                href="#"
                className="text-[#1A4D2E] hover:text-[#153d25] text-sm"
              >
                Payment
              </a>
              <a
                href="#"
                className="text-[#1A4D2E] hover:text-[#153d25] text-sm"
              >
                Budget
              </a>
              <a
                href="#"
                className="text-[#1A4D2E] hover:text-[#153d25] text-sm"
              >
                Card
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-[#1A4D2E] cursor-pointer" />
              <MessageSquare className="h-5 w-5 text-[#1A4D2E] cursor-pointer" />
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className="focus:outline-none"
                >
                  <User className="h-5 w-5 text-[#1A4D2E] cursor-pointer" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-[#1A4D2E]" />
                <span className="text-xl font-bold">{formatToINR(amount)}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Current Balance</p>
            </div>
            <button
              onClick={() => setIsApplyLoanModalOpen(true)}
              className="bg-[#1A4D2E] text-white px-3 py-1.5 rounded-md hover:bg-[#153d25] transition-colors text-sm"
            >
              Get a Loan
            </button>
          </div>
        </div>

        {/* Action Bars */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow p-3 text-center cursor-pointer hover:shadow-md transition-shadow">
            <Wallet className="h-5 w-5 text-[#1A4D2E] mx-auto mb-1" />
            <span className="text-[#1A4D2E] text-sm">Borrow Cash</span>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center cursor-pointer hover:shadow-md transition-shadow">
            <CircleDollarSign className="h-5 w-5 text-[#1A4D2E] mx-auto mb-1" />
            <span className="text-[#1A4D2E] text-sm">Transact</span>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center cursor-pointer hover:shadow-md transition-shadow">
            <DollarSign className="h-5 w-5 text-[#1A4D2E] mx-auto mb-1" />
            <span className="text-[#1A4D2E] text-sm">Deposit Cash</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for loans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1A4D2E]"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        {/* Applied Loans Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-800">
              Applied Loans
            </h2>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-380px)]">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading loans...</div>
              </div>
            ) : filteredLoans.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">No loans found</div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Applied
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.map((loan) => (
                    <tr key={loan._id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {loan.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatToINR(loan.loanAmount)}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(loan.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full text-white ${getStatusColor(
                            loan.loanStatus
                          )}`}
                        >
                          {loan.loanStatus}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setShowLoanDetails(true);
                          }}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Apply Loan Modal */}
      <ApplyLoanModal
        isOpen={isApplyLoanModalOpen}
        onClose={() => setIsApplyLoanModalOpen(false)}
        onLoanApplied={loadLoans} // Add this callback to refresh loans
      />

      {/* Loan Details Modal */}
      <Modal
        isOpen={showLoanDetails}
        onClose={() => setShowLoanDetails(false)}
        title="Loan Details"
      >
        {selectedLoan && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="mt-1">{selectedLoan.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Loan Amount</p>
                <p className="mt-1">{formatToINR(selectedLoan.loanAmount)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Loan Tenure</p>
                <p className="mt-1">{selectedLoan.loanTenure} months</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`mt-1 px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full text-white ${getStatusColor(
                    selectedLoan.loanStatus
                  )}`}
                >
                  {selectedLoan.loanStatus}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Employment Status
                </p>
                <p className="mt-1">{selectedLoan.employmentStatus}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Employment Address
                </p>
                <p className="mt-1">{selectedLoan.employmentAddress}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Reason for Loan
                </p>
                <p className="mt-1">{selectedLoan.reasonForLoan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Applied On</p>
                <p className="mt-1">{formatDate(selectedLoan.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>
                <p className="mt-1">{formatDate(selectedLoan.updatedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MainHome;
