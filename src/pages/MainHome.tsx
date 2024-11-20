import  { useState } from "react";
import {
  Bell,
  MessageSquare,
  User,
  Search,
  DollarSign,
  CircleDollarSign,
  Wallet,
} from "lucide-react";

const MainHome = () => {
  const [amount] = useState("0.0");
  const [showDropdown, setShowDropdown] = useState(false);

  const mockLoans = [
    {
      officer: "John Deon",
      amount: 50000.0,
      date: "June 09, 2021",
      status: "Funded",
    },
    {
      officer: "John Deon",
      amount: 100000.0,
      date: "June 07, 2021",
      status: "Pending",
    },
    {
      officer: "John Deon",
      amount: 150000.0,
      date: "June 07, 2021",
      status: "Rejected",
    },
    {
      officer: "John Deon",
      amount: 100000.0,
      date: "May 17, 2021",
      status: "Disbursed",
    },
    {
      officer: "John Deon",
      amount: 75000.0,
      date: "May 15, 2021",
      status: "Pending",
    },
    {
      officer: "John Deon",
      amount: 125000.0,
      date: "May 10, 2021",
      status: "Funded",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Funded":
        return "bg-yellow-500";
      case "Pending":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Disbursed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

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
                  onClick={() => setShowDropdown(!showDropdown)}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Amount Display */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-[#1A4D2E]" />
                <span className="text-xl font-bold">{amount}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Current Balance</p>
            </div>
            <button className="bg-[#1A4D2E] text-white px-3 py-1.5 rounded-md hover:bg-[#153d25] transition-colors text-sm">
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Officer
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockLoans.map((loan, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {loan.officer}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${loan.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.date}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full text-white ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
