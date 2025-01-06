import React from "react";

const Card = ({ title, value, growth }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 border-t-4 border-blue-500">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-green-500">{growth}</p>
    </div>
  );
};

export default Card;
