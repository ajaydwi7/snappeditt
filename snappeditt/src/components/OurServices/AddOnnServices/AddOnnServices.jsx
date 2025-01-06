import React from "react";

const AddOnnServices = ({ services }) => {
  return (
    <div className="service-cards-section container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-center">
              {service.name}
            </h3>
            <p className="text-gray-700 text-center mb-4">{service.price}</p>
            <button
              className="flex items-center justify-center w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-lg"
              onClick={() => alert(`Added ${service.name} to cart`)}
            >
              <span className="material-icons text-lg pr-2">shopping_cart</span>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOnnServices;
