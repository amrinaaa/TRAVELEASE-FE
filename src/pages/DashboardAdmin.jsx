import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardAdmin = ({ isSidebarOpen }) => {
  const userStats = {
    totalUsers: 1289,
    percentageChange: "+ 5.2%"
  };

  const revenueStats = {
    totalRevenue: 29500000,
    percentageChange: "+ 8.4%"
  };

  const reportStats = {
    totalReports: 52,
    percentageChange: "- 2.1%"
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  const revenueChartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 38 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 60 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 78 },
    { month: 'Aug', value: 66 },
    { month: 'Sep', value: 80 },
    { month: 'Oct', value: 95 },
    { month: 'Nov', value: 100 },
    { month: 'Dec', value: 110 },
  ];

  const userChartData = [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 230 },
    { month: 'Apr', users: 250 },
    { month: 'May', users: 290 },
    { month: 'Jun', users: 310 },
  ];

  return (
    <div className={`bg-ungu10 pt-16 pb-4 h-full min-h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
      <h1 className='p-6 text-left text-2xl font-semibold text-gray-800'>Welcome, Admin!</h1>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.totalUsers}</div>
            <div className="text-sm">
              <span className={`${userStats.percentageChange.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {userStats.percentageChange}
              </span>
              <span className="text-gray-500 ml-2">Since last week</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(revenueStats.totalRevenue)}</div>
            <div className="text-sm">
              <span className={`${revenueStats.percentageChange.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {revenueStats.percentageChange}
              </span>
              <span className="text-gray-500 ml-2">Since last month</span>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Reports</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{reportStats.totalReports}</div>
            <div className="text-sm">
              <span className={`${reportStats.percentageChange.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {reportStats.percentageChange}
              </span>
              <span className="text-gray-500 ml-2">Since last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(value) => `${value}jt`} axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#666' }} domain={[0, 350]} axisLine={false} tickLine={false} />
                  <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;