import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext"; // Use Global Context
import ServiceForm from "@/components/GlobalComponents/ServiceForm/ServiceForm";
import ImageComparisonSlider from "@/components/GlobalComponents/ImageComparisonSlider/ImageComparisonSlider";
import { toast } from "react-toastify"; // Import toast for notifications

const ServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSlider, setActiveSlider] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [formData, setFormData] = useState({ quantity: 1 });
  const [formConfig, setFormConfig] = useState([]);

  const { serviceStore } = useGlobalContext();
  const { addToCart, state: { cart } } = serviceStore;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${categorySlug}/${serviceSlug}`);
        const fetchedService = response.data;
        setService(fetchedService);
        loadFormConfig(fetchedService);
      } catch (err) {
        setError("Error fetching service data. Please try again later.");
        console.error("Service fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [categorySlug, serviceSlug]);

  const loadFormConfig = (service) => {
    // Example dynamic form configuration
    const config = [
      {
        name: "Order name",
        label: "Order name",
        type: "text",
        required: true,
        placeholder: "Order Name",
      },
      {
        name: "Order Image",
        label: "Order Image",
        type: "text",
        required: true,
        placeholder: "Provide WeTransfer Dropbox or any cloud-based link for RAW images.",
      },
      {
        name: "Additionals Order Details",
        label: "Additionals Order Details",
        type: "textarea",
        required: true,
        placeholder: "Additionals Order Details...",
      },
    ];
    setFormConfig(config);
  };

  const handleVariationSelect = (variationType, option) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationType.name]: option,

    }));
  };

  const clearVariationSelection = (variationTypeName) => {
    setSelectedVariations(prev => {
      const newState = { ...prev };
      delete newState[variationTypeName];
      return newState;
    });
  };

  const calculatePrice = () => {
    if (!service) return 0;

    // If no variation types, use base price
    if (service.variationTypes.length === 0) return service.basePrice;

    const selectedIds = Object.values(selectedVariations)
      .filter(v => v)
      .map(v => v._id.toString());

    // Find the correct price combination
    const combination = service.priceCombinations.find(pc =>
      pc.combination.every(id => selectedIds.includes(id.toString())) &&
      pc.combination.length === selectedIds.length
    );

    return combination ? combination.price : service.basePrice;
  };


  const handleAddToCart = () => {
    if (!service) return;

    // Validate required variations
    const requiredVariations = service.variationTypes.filter((vt) => vt.required);
    const missingVariations = requiredVariations.some((vt) => !selectedVariations[vt.name]);

    if (missingVariations) {
      toast.error("Please select all required options");
      return;
    }

    // Validate form data
    const requiredFormFields = formConfig.filter((field) => field.required);
    const missingFormFields = requiredFormFields.some((field) => !formData[field.name]);

    if (missingFormFields) {
      toast.error("Please fill all required fields");
      return;
    }

    // Calculate the correct price before sending to `addToCart`
    const selectedIds = Object.values(selectedVariations)
      .filter((v) => v)
      .map((v) => v._id.toString());

    let finalPrice = service.basePrice;

    if (service.variationTypes.length > 0) {
      const combination = service.priceCombinations.find(pc =>
        pc.combination.every(id => selectedIds.includes(id.toString())) &&
        pc.combination.length === selectedIds.length
      );

      finalPrice = combination ? combination.price : service.basePrice;
    }

    // ServicePage.jsx - Update cartItem structure
    const cartItem = {
      serviceId: service._id,
      serviceName: service.name,
      basePrice: service.basePrice, // Ensure this is included
      finalPrice: finalPrice,
      quantity: parseInt(formData.quantity),
      featureImage: service.featureImage,
      selectedVariations: Object.entries(selectedVariations).map(([type, option]) => ({
        variationType: type,
        optionId: option._id,
        optionName: option.name
      })),
      formData: formData,
    };

    addToCart(cartItem);
    toast.success(`${service.name} added to cart!`);
  };


  const isInCart = cart.some((item) => item.serviceId === service?._id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
                  className={`w-4 h-4 rounded-full ${activeSlider === index ? "bg-primaryRed" : "bg-gray-300"
                    }`}
                ></button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">{service.description}</p>
            <p className="text-grey-600 mt-6 mb-4">Features:</p>
            <ul className="list-disc pl-6 space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-4xl font-md text-primaryRed font-cursive capitalize ">{service.name}</h1>
          <p className="text-3xl font-bold text-gray-800 mt-4 font-secondry">
            ${service.basePrice.toFixed(2)}
          </p>

          {/* Updated Variations Section */}
          <div className="bg-gray-100 p-5 mt-4 mb-4">
            {service.variationTypes?.map((variationType) => (
              <div key={variationType._id} className="mt-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-md font-bold mr-4">{variationType.name}:</h2>
                  <div className="flex flex-wrap gap-4">
                    {variationType.options.map((option) => (
                      <button
                        key={option._id}
                        onClick={() => handleVariationSelect(variationType, option)}
                        className={`py-2 px-4 rounded-md border ${selectedVariations[variationType.name]?._id === option._id
                          ? "border-primaryRed text-black"
                          : "border-gray-300 hover:border-gray-500"
                          }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedVariations[variationType.name] && (
                  <p className="text-gray-700 mt-2 mb-4">
                    Selected:{" "}
                    <span className="font-md">
                      {selectedVariations[variationType.name].name}
                    </span>{" "}
                    -{" "}
                    <span>
                      {selectedVariations[variationType.name].description}
                    </span>


                    <span
                      onClick={() => clearVariationSelection(variationType.name)}
                      className="text-primaryRed cursor-pointer hover:underline ml-4"
                    >
                      Clear
                    </span>

                    {/* Show price adjustment only if it exists and is not zero */}
                    {selectedVariations[variationType.name].priceAdjustment &&
                      selectedVariations[variationType.name].priceAdjustment !== 0 && (
                        <span className="ml-2">
                          (+${selectedVariations[variationType.name].priceAdjustment.toFixed(2)})
                        </span>
                      )}

                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Other Form Fields */}
          <ServiceForm
            formConfig={formConfig}
            formData={formData}
            onFormChange={setFormData}
          />

          {/* Image Number and Add to Cart Button (Side by Side) */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Image Number</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity || 1}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryRed"
                required
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-2 bg-primaryRed text-white rounded-md hover:bg-red-700 transition-colors"
            >
              {isInCart ? "Update Cart" : "Add to Cart"}
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ServicePage;