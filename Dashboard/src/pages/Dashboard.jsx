import { FiSettings } from "react-icons/fi";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import Sidebar from "../components/sidebar";
import DashboardStats from "../components/DashboardStats";
import SalesOverview from "../components/SalesOverview";
import TopCountries from "../components/TopCountries";
import TopChannels from "../components/TopChannels";
import Customers from "../components/Customers";
import RecentActivity from "../components/RecentActivity";
import IncomeExpenses from "../components/IncomeExpenses";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between pb-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <IoSearch className="w-6 h-6 text-gray-600 cursor-pointer" />
            <IoNotificationsOutline className="w-6 h-6 text-gray-600 cursor-pointer" />
            <FiSettings className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </header>

        <DashboardStats />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <SalesOverview />
          <TopCountries />
          <TopChannels />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          <Customers />
          <RecentActivity />
          <IncomeExpenses />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
