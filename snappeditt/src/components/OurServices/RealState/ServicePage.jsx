import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext"; // Use Global Context
import ImageComparisonSlider from "@/components/GlobalComponents/ImageComparisonSlider/ImageComparisonSlider";

const ServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({ "Image Number": 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSlider, setActiveSlider] = useState(0);
  const [selectedRetouchingType, setSelectedRetouchingType] = useState("");

  const { serviceStore } = useGlobalContext(); // Access serviceStore via GlobalContext
  const { addToCart, state: { cart } } = serviceStore;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${categorySlug}/${serviceSlug}`);
        const fetchedService = response.data;

        const initialFormData = {};
        fetchedService.formFields.forEach((field) => {
          initialFormData[field.name] = field.type === "number" ? 1 : ""; // Default number fields to 1
        });
        setFormData(initialFormData);
        setService(fetchedService);
      } catch (err) {
        setError("Error fetching service data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [categorySlug, serviceSlug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedRetouchingType) {
      alert("Please select a retouching type.");
      return;
    }

    // Parse quantity from Image Number
    const imageNumber = parseInt(formData["Image Number"], 10) || 1;

    // Add service to cart with quantity and total price
    addToCart(
      {
        id: service._id,
        name: service.name,
        price: service.price,
        retouchingType: selectedRetouchingType,
        featureImage: service.featureImage,
        formData,
      },
      imageNumber // Pass quantity (Image Number)
    );

    alert(`${service.name} added to cart!`);
  };


  const handleRemoveFromCart = () => {
    serviceStore.removeFromCart(service._id);
    alert(`${service.name} removed from cart.`);
  };

  const handleRetouchingTypeSelect = (type) => {
    setSelectedRetouchingType(type.name);
  };

  const clearSelection = () => {
    setSelectedRetouchingType("");
  };

  const isInCart = cart.some((item) => item.id === service?._id);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="service-page container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:mr-4">
          <div className="relative">
            {service.images[activeSlider] && (
              <ImageComparisonSlider
                beforeImage={service.images[activeSlider].before}
                afterImage={service.images[activeSlider].after}
              />
            )}
            <div className="flex justify-center mt-4 space-x-2">
              {service.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlider(index)}
                  className={`w-4 h-4 rounded-full ${activeSlider === index ? "bg-primaryRed" : "bg-gray-300"}`}
                ></button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">{service.description}</p>
            <p className="text-grey-600 mt-6 mb-4">Features:</p>
            <ul className="list-disc pl-6 space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-3xl font-bold text-primaryRed">{service.name}</h1>
          <p className="text-2xl font-bold text-gray-800 mt-4">${service.price}</p>

          {/* Retouching Types */}
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-bold mr-4">Retouching Type:</h2>
              <div className="flex flex-wrap gap-4">
                {service.retouchingTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => handleRetouchingTypeSelect(type)}
                    className={`py-2 px-4 rounded-md border ${selectedRetouchingType === type.name ? "bg-primaryRed text-white" : "bg-gray-200"}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {selectedRetouchingType && (
              <p className="text-gray-700 mt-2">
                Selected: <span className="font-bold">{selectedRetouchingType}</span> -{" "}
                <span>{service.retouchingTypes.find(type => type.name === selectedRetouchingType)?.description}</span>
                <span
                  onClick={clearSelection}
                  className="text-primaryRed cursor-pointer hover:underline ml-4"
                >
                  Clear Selection
                </span>
              </p>
            )}
          </div>

          <form className="mt-6">
            {service.formFields.map((field, index) => {
              if (field.name === "Image Number") {
                return (
                  <div
                    key={index}
                    className="flex items-center mb-4 space-x-4" // Flex container for side-by-side layout
                  >
                    <label
                      htmlFor={field.id}
                      className="sr-only" // Add this class to visually hide the label
                    >
                      {field.name}{" "}
                      {field.required && (
                        <span className="text-primaryRed">*</span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder || "Enter number"} // Optional placeholder for better UX
                      value={formData[field.name]}
                      required={field.required}
                      onChange={handleInputChange}
                      className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    />
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="bg-primaryRed text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    >
                      {isInCart ? "Update Cart" : "Add to Cart"}
                    </button>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.name}{" "}
                      {field.required && <span className="text-primaryRed">*</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      required={field.required}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    />
                  </div>
                );
              }
            })}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
