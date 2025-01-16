import React from 'react';

const OrdersTable = () => {
  const orders = [
    { id: '#4532', customer: 'John Smith', product: 'Nike Air Max', amount: '$129.99', status: 'Completed' },
    { id: '#4531', customer: 'Sarah Johnson', product: 'iPhone Case', amount: '$25.00', status: 'Processing' },
    { id: '#4530', customer: 'Michael Brown', product: 'Gaming Mouse', amount: '$79.99', status: 'Processing' },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Product</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.product}</td>
              <td className="p-2">{order.amount}</td>
              <td className="p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
