import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed flex flex-col">
      <h1 className="text-xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </h1>
      <nav className="flex-1 mt-4">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) =>
              `block px-4 py-2 my-1 text-sm font-medium ${isActive
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
