import React, { useState } from "react";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Button to open the panel */}
      <button
        onClick={openPanel}
        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none"
      >
        Open Panel
      </button>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
      >
        {/* Close Button */}
        <button
          onClick={closePanel}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl focus:outline-none"
        >
          ✖
        </button>

        {/* Panel Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Free Trial For Photo Editing Order
          </h2>
          <p className="mb-6 text-gray-600">
            Start it easy! Find out the price in several steps:
          </p>
          <form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Last Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Phone Number"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
