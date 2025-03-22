import { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";

const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState({});

  const orders = [
    {
      id: 1,
      orderId: "#123567",
      customer: "Patricia Semklo",
      date: "2025-02-01",
      status: "Completed",
      items: 3,
      total: "$289.66",
      paymentType: "Paypal"
    },
    {
      id: 2,
      orderId: "#779912",
      customer: "Dominik Lamakani",
      date: "2025-02-03",
      status: "Pending",
      items: 3,
      total: "$1,767.04",
      paymentType: "Paypal"
    },
    {
      id: 3,
      orderId: "#889924",
      customer: "Ivan Mesaros",
      date: "2025-02-02",
      status: "Shipped",
      items: 3,
      total: "$996.00",
      paymentType: "Paypal"
    },
    {
      id: 4,
      orderId: "#889924",
      customer: "Ivan Mesaros",
      date: "2025-02-05",
      status: "Cancelled",
      items: 16,
      total: "$1299.00",
      paymentType: "Paypal"
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-600"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedOrders = {};
    if (newSelectAll) {
      orders.forEach((order) => {
        newSelectedOrders[order.id] = true;
      });
    }
    setSelectedOrders(newSelectedOrders);
  };

  const handleSelectOrder = (id) => {
    const newSelectedOrders = { ...selectedOrders, [id]: !selectedOrders[id] };
    setSelectedOrders(newSelectedOrders);
    setSelectAll(
      Object.keys(newSelectedOrders).length === orders.length && Object.values(newSelectedOrders).every(Boolean)
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Orders</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4">
                    <input type="checkbox" className="form-checkbox" checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  <th className="p-2">ORDER ID</th>
                  <th className="p-2">CUSTOMER</th>
                  <th className="p-2">DATE</th>
                  <th className="p-2">STATUS</th>
                  <th className="p-2">ITEMS</th>
                  <th className="p-2">TOTAL</th>
                  <th className="p-2">PAYMENT TYPE</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={!!selectedOrders[order.id]}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="p-2 text-blue-600 cursor-pointer">{order.orderId}</td>
                    <td className="p-2">{order.customer}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2 whitespace-nowrap">
                      <span className={`px-2 inline-flex leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}
                      </span>
                    </td>
                    <td className="p-2">{order.items}</td>
                    <td className="p-2 text-green-600">{order.total}</td>
                    <td className="p-2">{order.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
