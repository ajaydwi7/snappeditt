import React from 'react';

const Widgets = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%' },
    { title: 'Orders', value: '+573', change: '+201' },
    { title: 'Active Users', value: '2,831', change: '+180' },
    { title: 'Conversion Rate', value: '2.4%', change: '+1.2%' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white shadow-md p-4 rounded">
          <h3 className="text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-green-500">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default Widgets;
