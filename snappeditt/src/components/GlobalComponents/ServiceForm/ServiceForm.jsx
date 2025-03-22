import React from "react";

const ServiceForm = ({ formConfig, formData, onFormChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  return (
    <div className="service-form">
      <div className="space-y-4">
        {formConfig.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-medium mb-2">
              {field.name}{" "}
              {field.required && <span className="text-primaryRed">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryRed"
              required={field.required}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceForm;