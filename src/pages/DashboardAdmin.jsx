import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getAllAdminDashboardData } from '../redux/actions/adminDashboardActions';

const DashboardAdmin = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  
  const {
    totalUsersData,
    totalHotelPartnersData,
    totalPlanePartnersData,
    monthlyUsersGraphData,
    monthlyHotelPartnersGraphData,
    monthlyPlanePartnersGraphData,
    loadingTotalUsers,
    loadingTotalHotelPartners,
    loadingTotalPlanePartners,
    loadingMonthlyUsersGraph,
    loadingMonthlyHotelPartnersGraph,
    loadingMonthlyPlanePartnersGraph,
    errorTotalUsers,
    errorTotalHotelPartners,
    errorTotalPlanePartners,
    errorMonthlyUsersGraph,
    errorMonthlyHotelPartnersGraph,
    errorMonthlyPlanePartnersGraph,
  } = useSelector((state) => state.adminDashboard);

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(getAllAdminDashboardData());
  }, [dispatch]);

  // Transform graph data for charts (API returns month name, need to format for display)
  const transformGraphData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => ({
      month: item.month ? item.month.split(' ')[0].substring(0, 3) : '', // Extract and truncate month name
      value: item.count || 0
    }));
  };

  const userChartData = transformGraphData(monthlyUsersGraphData);
  const partnerHotelChartData = transformGraphData(monthlyHotelPartnersGraphData);
  const partnerPlaneChartData = transformGraphData(monthlyPlanePartnersGraphData);

  // Fallback data for when API data is not available
  const fallbackUserChartData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 65 },
    { month: 'May', value: 78 },
    { month: 'Jun', value: 85 },
    { month: 'Jul', value: 92 },
    { month: 'Aug', value: 88 },
    { month: 'Sep', value: 105 },
    { month: 'Oct', value: 125 },
    { month: 'Nov', value: 145 },
    { month: 'Dec', value: 160 },
  ];
  
  const fallbackPartnerHotelChartData = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 32 },
    { month: 'Mar', value: 28 },
    { month: 'Apr', value: 45 },
    { month: 'May', value: 58 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 72 },
    { month: 'Aug', value: 68 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 95 },
    { month: 'Nov', value: 110 },
    { month: 'Dec', value: 125 },
  ];

  const fallbackPartnerPlaneChartData = [
    { month: 'Jan', value: 15 },
    { month: 'Feb', value: 22 },
    { month: 'Mar', value: 18 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 48 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 62 },
    { month: 'Aug', value: 58 },
    { month: 'Sep', value: 75 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 100 },
    { month: 'Dec', value: 115 },
  ];

  // Loading component (consistent with mitra plane dashboard)
  const LoadingCard = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  // Error component (consistent with mitra plane dashboard)
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
        Welcome <span className='text-ungu4'>Admin</span>!
      </h1>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          {loadingTotalUsers ? (
            <LoadingCard />
          ) : errorTotalUsers ? (
            <ErrorCard title="Total Users" error={errorTotalUsers} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {totalUsersData !== null ? totalUsersData : 0}
              </div>
              <div className="flex items-center text-sm">
                <Link 
                  to="/manajemen-pengguna"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Lihat selengkapnya
                </Link>
              </div>
            </div>
          )}

          {/* Total Partner Hotel */}
          {loadingTotalHotelPartners ? (
            <LoadingCard />
          ) : errorTotalHotelPartners ? (
            <ErrorCard title="Total Partner Hotel" error={errorTotalHotelPartners} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Partner Hotel</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {totalHotelPartnersData !== null ? totalHotelPartnersData : 0}
              </div>
              <div className="flex items-center text-sm">
                <Link 
                  to="/manajemen-mitra-hotel"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Lihat selengkapnya
                </Link>
              </div>
            </div>
          )}

          {/* Total Partner Plane */}
          {loadingTotalPlanePartners ? (
            <LoadingCard />
          ) : errorTotalPlanePartners ? (
            <ErrorCard title="Total Partner Plane" error={errorTotalPlanePartners} />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Partner Plane</h3>
              </div>
              <div className="text-3xl text-left font-bold text-gray-900 mb-1">
                {totalPlanePartnersData !== null ? totalPlanePartnersData : 0}
              </div>
              <div className="flex items-center text-sm">
                <Link 
                  to="/manajemen-mitra-pesawat"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 cursor-pointer"
                >
                  Lihat selengkapnya
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="px-6">
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            {loadingMonthlyUsersGraph ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorMonthlyUsersGraph ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorMonthlyUsersGraph}
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userChartData.length > 0 ? userChartData : fallbackUserChartData}>
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
                      domain={[0, 200]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Partner Hotel Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Partner Hotel Growth</h3>
            {loadingMonthlyHotelPartnersGraph ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorMonthlyHotelPartnersGraph ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorMonthlyHotelPartnersGraph}
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={partnerHotelChartData.length > 0 ? partnerHotelChartData : fallbackPartnerHotelChartData}>
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
                      domain={[0, 200]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Partner Plane Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Partner Plane Growth</h3>
            {loadingMonthlyPlanePartnersGraph ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : errorMonthlyPlanePartnersGraph ? (
              <div className="h-64 flex items-center justify-center text-red-500">
                Error loading chart: {errorMonthlyPlanePartnersGraph}
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={partnerPlaneChartData.length > 0 ? partnerPlaneChartData : fallbackPartnerPlaneChartData}>
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
                      domain={[0, 200]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#f59e0b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin