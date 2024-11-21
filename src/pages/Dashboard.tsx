import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { User, X } from "lucide-react";
import { fetchLoansForAdmin, updateLoanStatus } from "@/api/user";
import toast from "react-hot-toast";

interface Loan {
  _id: string;
  userId: string;
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  loanStatus: string;
  createdAt: string;
  updatedAt: string;
  employmentStatus?: string;
  employmentAddress?: string;
  reasonForLoan?: string;
}

interface AdminStats {
  loans: Loan[];
  totalLoans: number;
  totalDisbursed: number;
  totalUsers: number;
  pendingLoans: number;
  rejectedLoans: number;
  approvedLoans: number;
}

const Dashboard = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    loans: [],
    totalLoans: 0,
    totalDisbursed: 0,
    totalUsers: 0,
    pendingLoans: 0,
    rejectedLoans: 0,
    approvedLoans: 0,
  });

  const LOAN_STATUSES = ["all", "Pending", "Approved", "Rejected", "Disbursed"];

  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(typeof amount === "string" ? parseFloat(amount) : amount);
  };

  const statsData = [
    {
      title: "TOTAL LOANS",
      value: adminStats.totalLoans.toString(),
      icon: "📊",
    },
    {
      title: "TOTAL USERS",
      value: adminStats.totalUsers.toString(),
      icon: "👥",
    },
    {
      title: "TOTAL DISBURSED",
      value: formatCurrency(adminStats.totalDisbursed),
      icon: "💰",
    },
    {
      title: "PENDING LOANS",
      value: adminStats.pendingLoans.toString(),
      icon: "⏳",
    },
    {
      title: "APPROVED LOANS",
      value: adminStats.approvedLoans.toString(),
      icon: "✅",
    },
    {
      title: "REJECTED LOANS",
      value: adminStats.rejectedLoans.toString(),
      icon: "❌",
    },
  ];

  const loanTrendData = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
  ];

  const loadLoans = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchLoansForAdmin();
      const statsData: AdminStats = response.data;

      setAdminStats(statsData);
      setLoans(statsData.loans || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to fetch loans");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLoans();
  }, [loadLoans]);

  const handleUpdateStatus = async (loanId: string, newStatus: string) => {
    try {
      const response = await updateLoanStatus({ loanId, newStatus });
      if (response.status === 200) {
        toast.success(`Loan status updated to ${newStatus}`);

        // Reload the entire loans data to ensure all stats are updated
        await loadLoans();

        // Close the modal if it was open
        setIsDetailModalOpen(false);
        setSelectedLoan(null);
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
      toast.error("Failed to update loan status");
    }
  };

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

  const filteredLoans = loans.filter(
    (loan) =>
      statusFilter === "all" || loan.loanStatus.toLowerCase() === statusFilter
  );

  const openLoanDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Loan Applications</h2>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              {LOAN_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Loading loans...</div>
          ) : filteredLoans.length === 0 ? (
            <div className="text-center py-4">No loans found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Loan Amount</th>
                    <th className="text-left p-2">Loan Tenure</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr key={loan._id} className="border-b">
                      <td className="p-2 flex items-center">
                        <User className="w-8 h-8 rounded-full mr-2" />
                        {loan.fullName}
                      </td>
                      <td className="p-2">{formatCurrency(loan.loanAmount)}</td>
                      <td className="p-2">{loan.loanTenure} months</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(
                            loan.loanStatus
                          )}`}
                        >
                          {loan.loanStatus}
                        </span>
                      </td>
                      <td className="p-2 space-x-2">
                        <select
                          value={loan.loanStatus}
                          onChange={(e) =>
                            handleUpdateStatus(loan._id, e.target.value)
                          }
                          className="px-2 py-1 border rounded text-sm"
                        >
                          {LOAN_STATUSES.filter((s) => s !== "all").map(
                            (status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            )
                          )}
                        </select>
                        <button
                          onClick={() => openLoanDetails(loan)}
                          className="bg-[#0F4C3A] text-white px-3 py-1 rounded-md text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedLoan && isDetailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Loan Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <p className="font-semibold">{selectedLoan.fullName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Loan Amount</label>
                  <p className="font-semibold">
                    {formatCurrency(selectedLoan.loanAmount)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Loan Tenure</label>
                  <p className="font-semibold">
                    {selectedLoan.loanTenure} months
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(
                      selectedLoan.loanStatus
                    )}`}
                  >
                    {selectedLoan.loanStatus}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Employment Status
                </label>
                <p className="font-semibold">
                  {selectedLoan.employmentStatus || "Not Specified"}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Employment Address
                </label>
                <p className="font-semibold">
                  {selectedLoan.employmentAddress || "Not Provided"}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Reason for Loan</label>
                <p className="font-semibold">
                  {selectedLoan.reasonForLoan || "Not Specified"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Applied On</label>
                  <p className="font-semibold">
                    {new Date(selectedLoan.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Last Updated</label>
                  <p className="font-semibold">
                    {new Date(selectedLoan.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Loan Status
              </label>
              <select
                value={selectedLoan.loanStatus}
                onChange={(e) =>
                  handleUpdateStatus(selectedLoan._id, e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                {LOAN_STATUSES.filter((s) => s !== "all").map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Loans Released Monthly
            </h2>
            <div className="h-64">
              <LineChart width={800} height={240} data={loanTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#0F4C3A" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
