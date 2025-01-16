import React from "react";

const AdminTopBar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-gray-600">Type to search...</div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600">🔔</button>
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
          <span>Thomas Anree</span>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
