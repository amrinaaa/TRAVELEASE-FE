import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardMitraPesawat = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  // Sample data from your API responses
  const bookingData = {
    bookingToday: 163,
    percentageChange: "- 3.25%"
  };

  const airplaneData = {
    totalPlanes: 543
  };

  const revenueData = {
    revenueToday: 4350000,
    percentageChange: "+ 4.25%"
  };

  // Sample data for Total Revenue chart (line chart)
  const totalRevenueData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 80 },
    { month: 'Jun', value: 72 },
    { month: 'Jul', value: 68 },
    { month: 'Aug', value: 50 },
    { month: 'Sep', value: 45 },
    { month: 'Okt', value: 75 },
    { month: 'Nov', value: 65 },
    { month: 'Dec', value: 100 }
  ];

  // Sample data for Total Bookings chart (bar chart)
  const totalBookingsData = [
    { month: 'Jan', bookings: 18 },
    { month: 'Feb', bookings: 26 },
    { month: 'Mar', bookings: 21 },
    { month: 'Apr', bookings: 6 },
    { month: 'May', bookings: 34 },
    { month: 'Jun', bookings: 27 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  return (
      <div className={`bg-ungu10 pt-16 pb-4 h-full min-h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
      <h1 className='p-6 text-left text-2xl font-semibold text-gray-800'>Welcome, Mitra!</h1>
      
      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Bookings Today */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">New Bookings Today</h3>
            </div>
            <div className="text-3xl text-left font-bold text-gray-900 mb-1">
              {bookingData.bookingToday}
            </div>
            <div className="flex items-center text-sm">
              <span className={`${bookingData.percentageChange.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {bookingData.percentageChange}
              </span>
              <span className="text-gray-500 ml-2">Since last week</span>
            </div>
          </div>

          {/* Available Airplane */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">Available Airplane</h3>
            </div>
            <div className="text-3xl text-left font-bold text-gray-900">
              {airplaneData.totalPlanes}
            </div>
            <div className="flex items-center text-sm">
              <button 
                onClick={() => navigate('/manajemen-maskapai')}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer mt-1"
              >
                Lihat selengkapnya
              </button>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
            </div>
            <div className="text-3xl text-left font-bold text-gray-900 mb-1">
              {formatCurrency(revenueData.revenueToday)}
            </div>
            <div className="flex items-center text-sm">
              <span className={`${revenueData.percentageChange.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {revenueData.percentageChange}
              </span>
              <span className="text-gray-500 ml-2">Since last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={totalRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    tickFormatter={(value) => `${value}00k`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Total Bookings Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Bookings</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalBookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    domain={[0, 40]}
                  />
                  <Bar 
                    dataKey="bookings" 
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMitraPesawat