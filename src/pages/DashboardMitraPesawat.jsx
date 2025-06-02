import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getAllPlaneDashboardData } from '../redux/actions/mitraPlaneDashboardActions';

const DashboardMitraPesawat = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const {
    bookingTodayData,
    loadingBookingToday,
    errorBookingToday,
    availableAirplaneData,
    loadingAvailableAirplane,
    errorAvailableAirplane,
    revenueTodayData,
    loadingRevenueToday,
    errorRevenueToday,
    monthlyRevenueData,
    loadingMonthlyRevenue,
    errorMonthlyRevenue,
    monthlyBookingData,
    loadingMonthlyBooking,
    errorMonthlyBooking,
  } = useSelector((state) => state.mitraPlaneDashboard);

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(getAllPlaneDashboardData());
  }, [dispatch]);

  // Format currency helper (consistent with hotel dashboard)
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  // Transform monthly revenue data for chart (consistent naming)
  const transformedRevenueData = monthlyRevenueData && monthlyRevenueData.length > 0 
    ? monthlyRevenueData.map(item => ({
        month: item.month.substring(0, 3), // Convert "January" to "Jan"
        value: item.totalRevenue / 100000 // Convert to 100k units for display
      }))
    : [];

  // Transform monthly booking data for chart (consistent naming)
  const transformedBookingData = monthlyBookingData && monthlyBookingData.length > 0 
    ? monthlyBookingData.map(item => ({
        month: item.month.substring(0, 3), // Convert "January" to "Jan"
        bookings: item.totalBooking
      }))
    : [];

  // Loading component (consistent with hotel dashboard)
  const LoadingCard = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  // Error component (consistent with hotel dashboard)
  const ErrorCard = ({ title, error }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-red-500 text-sm">
        Error loading data: {error}
      </div>
    </div>
  );

  return (
    <div className={`bg-ungu10 pt-16 pb-4 h-full min-h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
      <h1 className='p-6 text-left text-2xl font-semibold text-gray-800'>
        Welcome <span className='text-ungu4'>{availableAirplaneData?.partnerName || 'Mitra'}</span>, Mitra Plane!
      </h1>
      
      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Bookings Today */}
          {loadingBookingToday ? (
            <LoadingCard />
          ) : errorBookingToday ? (
            <ErrorCard title="New Bookings Today" error={errorBookingToday} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">New Bookings Today</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {bookingTodayData?.bookingToday || 0}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${bookingTodayData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {bookingTodayData?.percentageChange || '0%'}
                </span>
                <span className="text-gray-500 ml-2">Since last week</span>
              </div>
            </div>
          )}

          {/* Available Airplane */}
          {loadingAvailableAirplane ? (
            <LoadingCard />
          ) : errorAvailableAirplane ? (
            <ErrorCard title="Available Airplane" error={errorAvailableAirplane} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Available Airplane</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {availableAirplaneData?.totalPlanes || 0}
              </div>
              <div className="flex items-center text-sm">
                <button 
                  onClick={() => navigate('/manajemen-maskapai')}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Lihat selengkapnya
                </button>
              </div>
            </div>
          )}

          {/* Revenue */}
          {loadingRevenueToday ? (
            <LoadingCard />
          ) : errorRevenueToday ? (
            <ErrorCard title="Revenue" error={errorRevenueToday} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {formatCurrency(revenueTodayData?.revenueToday || 0)}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${revenueTodayData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {revenueTodayData?.percentageChange || '0%'}
                </span>
                <span className="text-gray-500 ml-2">Since last week</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Revenue</h3>
            {loadingMonthlyRevenue ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorMonthlyRevenue ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorMonthlyRevenue}
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transformedRevenueData}>
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
            )}
          </div>

          {/* Total Bookings Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Bookings</h3>
            {loadingMonthlyBooking ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorMonthlyBooking ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorMonthlyBooking}
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transformedBookingData}>
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
                      domain={[0, 'dataMax + 10']}
                    />
                    <Bar 
                      dataKey="bookings" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMitraPesawat