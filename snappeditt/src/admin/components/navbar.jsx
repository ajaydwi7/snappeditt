import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        <Link to="/admin/dashboard" className="text-white hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/admin/products" className="text-green-600 hover:text-blue-400">
          Products
        </Link>
        <Link to="/admin/users" className="text-white hover:text-blue-400">
          Users
        </Link>
        <Link to="/admin/pages" className="text-white hover:text-blue-400">
          Pages
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;