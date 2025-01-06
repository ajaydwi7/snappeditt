import React from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const Header = () => {
  const { auth } = useGlobalContext();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <header className="bg-white shadow-md py-3 px-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;