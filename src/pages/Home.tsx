import React, { useState } from "react";
import { Wallet } from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-[#1A4D2E]" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Credit App
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-[#1A4D2E] text-white px-6 py-2 rounded-md hover:bg-[#153d25] transition-colors duration-200">
                Get Started
              </button>
              <button className="text-[#1A4D2E] hover:text-[#153d25] px-4 py-2">
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-2 space-y-2">
              <button className="w-full bg-[#1A4D2E] text-white px-4 py-2 rounded-md hover:bg-[#153d25] transition-colors duration-200">
                Get Started
              </button>
              <button className="w-full text-[#1A4D2E] px-4 py-2">Login</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Quick Business Credit
                <span className="block mt-2 text-[#1A4D2E]">
                  Simple & Hassle-free
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Get instant credit approval for your business needs with
                competitive rates
              </p>

              <div className="mt-8">
                <button className="bg-[#1A4D2E] text-white px-8 py-3 rounded-md hover:bg-[#153d25] transition-colors duration-200 text-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Approval",
                description:
                  "Get credit approval within 24 hours with minimal documentation",
              },
              {
                title: "Flexible Credit Limits",
                description:
                  "Credit limits tailored to your business requirements",
              },
              {
                title: "Simple Process",
                description:
                  "Easy application process with minimal paperwork needed",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Range Section */}
        <div className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Credit Limits
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-[#1A4D2E]">₹50,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-600 mb-2">Maximum limit</p>
                <p className="text-3xl font-bold text-[#1A4D2E]">₹5,00,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <p className="text-gray-600 mb-2">Interest from</p>
                <p className="text-3xl font-bold text-[#1A4D2E]">1.5% p.m.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "No Hidden Charges",
              "Quick Disbursement",
              "Minimal Documents",
              "24/7 Support",
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center text-gray-800 hover:border-[#1A4D2E] transition-colors duration-200"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
