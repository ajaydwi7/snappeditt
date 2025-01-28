import React from "react";
import Navbar from "../components/navbar";
import AdminSidebar from "../components/Sidebar";
import AdminTopBar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* <AdminSidebar /> */}
      <div className="flex-1 bg-gray-100">
        <AdminTopBar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded-md">
              <h3 className="text-gray-600">Total Views</h3>
              <p className="text-2xl font-bold">$3.456K</p>
              <p className="text-green-600">+0.43%</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
              <h3 className="text-gray-600">Total Profit</h3>
              <p className="text-2xl font-bold">$45.2K</p>
              <p className="text-green-600">+4.35%</p>
            </div>
            <div className="bg-white p-4 shadow rounded-md">
              <h3 className="text-gray-600">Total Products</h3>
              <p className="text-2xl font-bold">2,450</p>
              <p className="text-green-600">+2.59%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
