import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/products" className="hover:text-blue-400">Products</Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="hover:text-blue-400">Users</Link>
        </li>
        <li className="mb-2">
          <Link to="/pages" className="hover:text-blue-400">Pages</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;