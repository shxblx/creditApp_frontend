import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react"; // Import the default user icon

const Dashboard = () => {
  // Sample data for stats
  const stats = [
    { title: "LOANS", value: "50", icon: "📊" },
    { title: "USERS", value: "100", icon: "👥" },
    { title: "CASH DISBURSED", value: "$50,000", icon: "💰" },
    { title: "REPAID LOANS", value: "20", icon: "✅" },
    { title: "REVENUE", value: "$450,000", icon: "📈" },
    { title: "CASH RECEIVED", value: "1,000,000", icon: "💵" },
  ];

  // Sample data for applied loans
  const appliedLoans = [
    {
      id: 1,
      name: "James Clark and Trust",
      type: "Personal Loan",
      date: "Jan 20, 2024",
      status: "Pending",
    },
    {
      id: 2,
      name: "Maria Hughes",
      type: "Auto Loan",
      date: "Jan 19, 2024",
      status: "Approved",
    },
    {
      id: 3,
      name: "Steve Jobs",
      type: "Business Loan",
      date: "Jan 18, 2024",
      status: "Rejected",
    },
    {
      id: 4,
      name: "Katherine Long Smith",
      type: "Personal Loan",
      date: "Jan 18, 2024",
      status: "Processing",
    },
    {
      id: 5,
      name: "William Davis",
      type: "Home Loan",
      date: "Jan 17, 2024",
      status: "Approved",
    },
  ];

  // Sample data for charts
  const loanTrendData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 50 },
    { month: "May", value: 40 },
    { month: "Jun", value: 55 },
  ];

  const outstandingData = [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 35000 },
    { month: "Mar", value: 25000 },
    { month: "Apr", value: 45000 },
    { month: "May", value: 30000 },
    { month: "Jun", value: 25000 },
  ];

  const repaymentData = [
    { month: "Jan", value: 15 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 20 },
    { month: "Apr", value: 30 },
    { month: "May", value: 22 },
    { month: "Jun", value: 18 },
  ];

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "processing":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
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

      {/* Applied Loans Table */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Applied Loans</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appliedLoans.map((loan) => (
                  <tr key={loan.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center">
                        <User className="w-8 h-8 rounded-full mr-2" />{" "}
                        {/* Default user icon */}
                        {loan.name}
                      </div>
                    </td>
                    <td className="p-2">{loan.type}</td>
                    <td className="p-2">{loan.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="bg-[#0F4C3A] text-white px-3 py-1 rounded-md text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        {/* Loan Trend Chart */}
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

        {/* Total Outstanding Chart */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Total Outstanding Loan - Monthly
            </h2>
            <div className="h-64">
              <BarChart width={800} height={240} data={outstandingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        {/* Repayment Chart */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Number of Repayments Collected - Monthly
            </h2>
            <div className="h-64">
              <BarChart width={800} height={240} data={repaymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#dc2626" />
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
