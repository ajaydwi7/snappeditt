import { useState } from "react";
import {
  Home, ShoppingCart, Users, CreditCard, Briefcase, CheckSquare,
  Mail, Calendar, BarChart, Settings, Grid
} from "lucide-react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen p-4">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">⚙️</span>
        </div>
      </div>

      {/* Menu */}
      <nav>
        <h3 className="text-gray-400 uppercase text-sm mb-2">Pages</h3>

        {/* Dashboard */}
        <div className="mb-2">
          <button
            className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => toggleMenu("dashboard")}
          >
            <Home className="w-5 h-5 mr-2 text-purple-500" />
            Dashboard
          </button>
          {openMenus["dashboard"] && (
            <div className="ml-8 mt-1 space-y-1">
              <a href="#" className="block text-blue-500">Main</a>
              <a href="#" className="block text-gray-500 hover:text-gray-700">Analytics</a>
              <a href="#" className="block text-gray-500 hover:text-gray-700">Fintech</a>
            </div>
          )}
        </div>

        {/* Other Menu Items */}
        {[
          { title: "E-Commerce", icon: <ShoppingCart className="w-5 h-5 mr-2" /> },
          { title: "Community", icon: <Users className="w-5 h-5 mr-2" /> },
          { title: "Finance", icon: <CreditCard className="w-5 h-5 mr-2" /> },
          { title: "Job Board", icon: <Briefcase className="w-5 h-5 mr-2" /> },
          { title: "Tasks", icon: <CheckSquare className="w-5 h-5 mr-2" /> },
        ].map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => toggleMenu(item.title)}
            >
              {item.icon}
              {item.title}
            </button>
          </div>
        ))}

        {/* Messages with Badge */}
        <div className="mb-2 flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Messages
          </div>
          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">4</span>
        </div>

        {/* Remaining Items */}
        {[
          { title: "Inbox", icon: <Mail className="w-5 h-5 mr-2" /> },
          { title: "Calendar", icon: <Calendar className="w-5 h-5 mr-2" /> },
          { title: "Campaigns", icon: <BarChart className="w-5 h-5 mr-2" /> },
          { title: "Settings", icon: <Settings className="w-5 h-5 mr-2" /> },
          { title: "Utility", icon: <Grid className="w-5 h-5 mr-2" /> },
        ].map((item, index) => (
          <div key={index} className="mb-2">
            <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              {item.icon}
              {item.title}
            </button>
          </div>
        ))}

        {/* More Section */}
        <h3 className="text-gray-400 uppercase text-sm mt-4">More</h3>
      </nav>
    </div>
  );
};

export default Sidebar;
