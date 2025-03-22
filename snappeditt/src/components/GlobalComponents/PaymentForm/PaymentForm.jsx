"use client"

import { useState } from "react"
import { Image } from "lucide-react"
import { Link } from "react-router-dom"
import { LockIcon } from "lucide-react"

import { useLocation } from "react-router-dom";

const PaymentForm = () => {

  const location = useLocation();
  const customFormData = location.state || {};
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    quantity: "1",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const total = (formData.price * formData.quantity).toFixed(2);
    const merchantEmail = "YOUR_PAYPAL_EMAIL@example.com"; // Replace with your email

    // Create PayPal URL
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${merchantEmail}&amount=${total}&item_name=${encodeURIComponent(formData.description)}&currency_code=USD`;

    // Redirect to PayPal
    window.location.href = paypalUrl;
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    value = e.target.value.replace(/[^0-9.]/g, "");
    setFormData(prev => ({ ...prev, price: value }));
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium text-gray-900">Snapp Editt</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Purchase details</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="sr-only">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="price" className="sr-only">
                      Price per item
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3 pr-12"
                        placeholder="Price per item"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <div className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-4 text-gray-500">
                          USD
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="sr-only">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0070ba] hover:bg-[#005ea6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>

            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Powered by</span>
                </div>
              </div>
              <div className="mt-3">
                <Image src="/placeholder.svg" alt="PayPal" width={100} height={30} className="h-8 w-auto mx-auto" />
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm text-black">
          <div className="space-x-4">
            <Link href="/policies" className="text-black hover:text-gray-900">
              Policies
            </Link>
            <Link href="/terms" className="text-black hover:text-gray-900">
              Terms
            </Link>
            <Link href="/privacy" className="text-black hover:text-gray-900">
              Privacy
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <span>© 1999 - 2025</span>
            <LockIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentForm

