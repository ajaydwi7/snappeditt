"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom";

const CustomPaymentForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    orderNumber: "",
    orderDescription: "",
    orderType: "existing",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    navigate("/payment-form", { state: formData });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-cursive text-[#ff4d4d] mb-6 pb-2 border-b-2 border-[#ff4d4d]">Custom Payment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
          />
        </div>

        <div>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Email ID*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
          />
        </div>

        <div>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="Order Number*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
          />
        </div>

        <div>
          <textarea
            name="orderDescription"
            value={formData.orderDescription}
            onChange={handleChange}
            placeholder="Order Description (if any)"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="existing"
              checked={formData.orderType === "existing"}
              onChange={handleChange}
              className="form-radio text-[#ff4d4d] focus:ring-[#ff4d4d]"
            />
            <span className="ml-2">Existing Order</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="new"
              checked={formData.orderType === "new"}
              onChange={handleChange}
              className="form-radio text-[#ff4d4d] focus:ring-[#ff4d4d]"
            />
            <span className="ml-2">New Order</span>
          </label>
        </div>

        <div className="relative">
          <select
            name="paymentMethod"
            className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:border-transparent"
            defaultValue="paypal"
          >
            <option value="paypal">Pay with PayPal</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>

        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-[#ff4d4d] text-white rounded-md hover:bg-[#ff3333] focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CustomPaymentForm

