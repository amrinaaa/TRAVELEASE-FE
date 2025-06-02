import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  getNewBooking, 
  getAvailableRoom, 
  getActiveBooking, 
  getRevenue, 
  getRevenueGraph, 
  getBookingGraph,
  getAllDashboardData 
} from '../redux/actions/mitraHotelDashboardActions';

const DashboardMitraHotel = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const {
    newBookingData,
    loadingNewBooking,
    errorNewBooking,
    availableRoomData,
    loadingAvailableRoom,
    errorAvailableRoom,
    activeBookingData,
    loadingActiveBooking,
    errorActiveBooking,
    revenueData,
    loadingRevenue,
    errorRevenue,
    revenueGraphData,
    loadingRevenueGraph,
    errorRevenueGraph,
    bookingGraphData,
    loadingBookingGraph,
    errorBookingGraph
  } = useSelector(state => state.mitraHotelDashboard);

  // Fetch all dashboard data on component mount
  useEffect(() => {
    dispatch(getAllDashboardData());
  }, [dispatch]);

  // Format currency helper
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  };

  // Transform revenue graph data for recharts - Add null check
  const transformedRevenueData = revenueGraphData && revenueGraphData.length > 0 
    ? revenueGraphData.map(item => ({
        month: item.month.substring(0, 3), // Convert "January" to "Jan"
        value: item.totalRevenue / 100000 // Convert to 100k units for display
      }))
    : [];

  // Transform booking graph data for recharts - Add null check
  const transformedBookingData = bookingGraphData && bookingGraphData.length > 0 
    ? bookingGraphData.map(item => ({
        month: item.month.substring(0, 3), // Convert "January" to "Jan"
        bookings: item.totalBooking
      }))
    : [];

  // Loading component
  const LoadingCard = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  // Error component
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
      {/* Fixed: Add null check for availableRoomData */}
      <h1 className='p-6 text-left text-2xl font-semibold text-gray-800'>
        Welcome <span className='text-ungu4'>{availableRoomData?.partnerName || 'Mitra'}</span>, Mitra Hotel!
      </h1>
      
      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* New Bookings Today */}
          {loadingNewBooking ? (
            <LoadingCard />
          ) : errorNewBooking ? (
            <ErrorCard title="New Bookings Today" error={errorNewBooking} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">New Bookings Today</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {newBookingData?.bookingToday || 0}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${newBookingData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {newBookingData?.percentageChange || '0%'}
                </span>
                <span className="text-gray-500 ml-2">Since last week</span>
              </div>
            </div>
          )}

          {/* Available Rooms */}
          {loadingAvailableRoom ? (
            <LoadingCard />
          ) : errorAvailableRoom ? (
            <ErrorCard title="Available Rooms" error={errorAvailableRoom} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Available Rooms</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {availableRoomData?.availableRoomToday || 0}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${availableRoomData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {availableRoomData?.percentageChange || '0%'}
                </span>
                <span className="text-gray-500 ml-2">Since last week</span>
              </div>
            </div>
          )}

          {/* Active Bookings */}
          {loadingActiveBooking ? (
            <LoadingCard />
          ) : errorActiveBooking ? (
            <ErrorCard title="Active Bookings" error={errorActiveBooking} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Active Bookings</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {activeBookingData?.activeToday || 0}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${activeBookingData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {activeBookingData?.percentageChange || '0%'}
                </span>
                <span className="text-gray-500 ml-2">Since last week</span>
              </div>
            </div>
          )}

          {/* Revenue */}
          {loadingRevenue ? (
            <LoadingCard />
          ) : errorRevenue ? (
            <ErrorCard title="Revenue" error={errorRevenue} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {formatCurrency(revenueData?.revenueToday || 0)}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${revenueData?.percentageChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {revenueData?.percentageChange || '0%'}
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
            {loadingRevenueGraph ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorRevenueGraph ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorRevenueGraph}
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
            {loadingBookingGraph ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorBookingGraph ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorBookingGraph}
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

export default DashboardMitraHotel