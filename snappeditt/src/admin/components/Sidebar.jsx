import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineForm,
  AiOutlineTable,
  AiOutlineSetting,
  AiOutlineMail,
  AiOutlineLineChart,
  AiOutlineAppstore,
} from "react-icons/ai";

const AdminSidebar = () => {
  const menuItems = [
    {
      category: "MENU",
      items: [
        { name: "Dashboard", icon: <AiOutlineDashboard />, active: true },
      ],
    },
    {
      category: "eCommerce",
      items: [
        { name: "Analytics", icon: <AiOutlineLineChart />, pro: true },
        { name: "Marketing", icon: <AiOutlineAppstore />, pro: true },
        { name: "CRM", icon: <AiOutlineUser />, pro: true },
        { name: "Stocks", icon: <AiOutlineShoppingCart />, pro: true },
      ],
    },
    {
      category: "Calendar",
      items: [{ name: "Calendar", icon: <AiOutlineCalendar />, pro: false }],
    },
    {
      category: "Profile",
      items: [
        { name: "List", icon: <AiOutlineUser />, pro: false },
        { name: "Kanban", icon: <AiOutlineAppstore />, pro: false },
      ],
    },
    {
      category: "Forms",
      items: [
        { name: "Form Elements", icon: <AiOutlineForm />, pro: true },
        { name: "Form Layout", icon: <AiOutlineForm />, pro: false },
      ],
    },
    {
      category: "Tables",
      items: [{ name: "Tables", icon: <AiOutlineTable />, pro: false }],
    },
    {
      category: "Pages",
      items: [
        { name: "Settings", icon: <AiOutlineSetting />, pro: false },
        { name: "File Manager", icon: <AiOutlineMail />, pro: true },
      ],
    },
  ];

  return (
    <div className="bg-blue-800 text-white w-64">
      <h1 className="text-2xl font-bold text-center py-6">TailAdmin</h1>
      <nav className="mt-6">
        {menuItems.map((category, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-sm font-bold px-6 uppercase text-gray-300">
              {category.category}
            </h3>
            <ul className="mt-2 space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className={`flex items-center gap-3 px-6 py-3 text-white ${item.active
                      ? "bg-indigo-600 rounded-md"
                      : "hover:bg-indigo-700"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    {item.pro && (
                      <span className="ml-auto text-sm bg-indigo-400 px-2 py-1 rounded-full">
                        Pro
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
