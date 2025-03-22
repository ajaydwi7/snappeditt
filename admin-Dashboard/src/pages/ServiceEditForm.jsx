"use client"

import { useState } from "react"
import { Search, ChevronDown, PlusIcon, MinusCircleIcon, TrashIcon } from "lucide-react"

import Sidebar from "../partials/Sidebar";
import Header from '../partials/Header';

const ServiceEditForm = ({ service, onSave }) => {
  const [formData, setFormData] = useState(
    service || {
      name: "",
      slug: "",
      description: "",
      basePrice: 0,
      featureImage: "",
      features: [],
      images: [],
      formFields: [],
      variationTypes: [],
      priceCombinations: [],
    },
  )
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPrice, setSelectedPrice] = useState('All Price');
  const [sortBy, setSortBy] = useState('Popularity');

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index][field] = value
    setFormData((prevData) => ({ ...prevData, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, { name: "", included: true }],
    }))
  }

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData((prevData) => ({ ...prevData, features: newFeatures }))
  }

  const handleImageChange = (index, field, value) => {
    const newImages = [...formData.images]
    newImages[index][field] = value
    setFormData((prevData) => ({ ...prevData, images: newImages }))
  }

  const addImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { before: "", after: "" }],
    }))
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData((prevData) => ({ ...prevData, images: newImages }))
  }

  const handleFormFieldChange = (index, field, value) => {
    const newFormFields = [...formData.formFields]
    newFormFields[index][field] = value
    setFormData((prevData) => ({ ...prevData, formFields: newFormFields }))
  }

  const addFormField = () => {
    setFormData((prevData) => ({
      ...prevData,
      formFields: [...prevData.formFields, { name: "", type: "text", placeholder: "", required: false }],
    }))
  }

  const removeFormField = (index) => {
    const newFormFields = formData.formFields.filter((_, i) => i !== index)
    setFormData((prevData) => ({ ...prevData, formFields: newFormFields }))
  }

  const handleVariationTypeChange = (index, field, value) => {
    const newVariationTypes = [...formData.variationTypes]
    newVariationTypes[index][field] = value
    setFormData((prevData) => ({ ...prevData, variationTypes: newVariationTypes }))
  }

  const addVariationType = () => {
    setFormData((prevData) => ({
      ...prevData,
      variationTypes: [...prevData.variationTypes, { name: "", options: [], required: false }],
    }))
  }

  const removeVariationType = (index) => {
    const newVariationTypes = formData.variationTypes.filter((_, i) => i !== index)
    setFormData((prevData) => ({ ...prevData, variationTypes: newVariationTypes }))
  }

  const handleVariationOptionChange = (typeIndex, optionIndex, field, value) => {
    const newVariationTypes = [...formData.variationTypes]
    newVariationTypes[typeIndex].options[optionIndex][field] = value
    setFormData((prevData) => ({ ...prevData, variationTypes: newVariationTypes }))
  }

  const addVariationOption = (typeIndex) => {
    const newVariationTypes = [...formData.variationTypes]
    newVariationTypes[typeIndex].options.push({ name: "", description: "" })
    setFormData((prevData) => ({ ...prevData, variationTypes: newVariationTypes }))
  }

  const removeVariationOption = (typeIndex, optionIndex) => {
    const newVariationTypes = [...formData.variationTypes]
    newVariationTypes[typeIndex].options = newVariationTypes[typeIndex].options.filter((_, i) => i !== optionIndex)
    setFormData((prevData) => ({ ...prevData, variationTypes: newVariationTypes }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Service Information</h1>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by category..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-gray-400
                     focus:border-gray-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-black transition duration-150 ease-in-out">
                  Search
                </button>
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-0">Service Name</h1>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Category filter */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>{selectedCategory}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded mt-1 py-2 hidden">
                      {/* Dropdown items */}
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">All Categories</button>
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">Electronics</button>
                      <button className="w-full px-3 py-1 hover:bg-slate-50 text-left">Accessories</button>
                    </div>
                  </div>

                  {/* Price filter */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>{selectedPrice}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                  </div>

                  {/* Sort by */}
                  <div className="relative">
                    <button className="w-full flex items-center justify-between bg-white border border-slate-200 rounded px-3 py-2">
                      <span>Sort by: {sortBy}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Name
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Slug
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="slug"
                          id="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Description
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Base Price
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="basePrice"
                          id="basePrice"
                          value={formData.basePrice}
                          onChange={handleChange}
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="featureImage" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Feature Image URL
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="featureImage"
                          id="featureImage"
                          value={formData.featureImage}
                          onChange={handleChange}
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Features</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Add features for this service.</p>
                  </div>
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                      <label htmlFor={`feature-${index}`} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Feature {index + 1}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name={`feature-${index}`}
                            id={`feature-${index}`}
                            value={feature.name}
                            onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                          />
                          <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            <input
                              type="checkbox"
                              checked={feature.included}
                              onChange={(e) => handleFeatureChange(index, "included", e.target.checked)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">Included</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:col-span-1">
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={addFeature}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Add Feature
                    </button>
                  </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Images</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Add before and after images for this service.</p>
                  </div>
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                      <label htmlFor={`image-${index}`} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Image Set {index + 1}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex flex-col space-y-2">
                          <input
                            type="text"
                            name={`image-before-${index}`}
                            id={`image-before-${index}`}
                            value={image.before}
                            onChange={(e) => handleImageChange(index, "before", e.target.value)}
                            placeholder="Before Image URL"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                          <input
                            type="text"
                            name={`image-after-${index}`}
                            id={`image-after-${index}`}
                            value={image.after}
                            onChange={(e) => handleImageChange(index, "after", e.target.value)}
                            placeholder="After Image URL"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:col-span-1">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={addImage}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Add Image Set
                    </button>
                  </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Form Fields</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Add custom form fields for this service.</p>
                  </div>
                  {formData.formFields.map((field, index) => (
                    <div
                      key={index}
                      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                      <label htmlFor={`field-${index}`} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Field {index + 1}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            name={`field-name-${index}`}
                            id={`field-name-${index}`}
                            value={field.name}
                            onChange={(e) => handleFormFieldChange(index, "name", e.target.value)}
                            placeholder="Field Name"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                          <select
                            name={`field-type-${index}`}
                            id={`field-type-${index}`}
                            value={field.type}
                            onChange={(e) => handleFormFieldChange(index, "type", e.target.value)}
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="textarea">Textarea</option>
                          </select>
                          <input
                            type="text"
                            name={`field-placeholder-${index}`}
                            id={`field-placeholder-${index}`}
                            value={field.placeholder}
                            onChange={(e) => handleFormFieldChange(index, "placeholder", e.target.value)}
                            placeholder="Placeholder"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name={`field-required-${index}`}
                              id={`field-required-${index}`}
                              checked={field.required}
                              onChange={(e) => handleFormFieldChange(index, "required", e.target.checked)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor={`field-required-${index}`} className="ml-2 block text-sm text-gray-900">
                              Required
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:col-span-1">
                        <button
                          type="button"
                          onClick={() => removeFormField(index)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={addFormField}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Add Form Field
                    </button>
                  </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Variation Types</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Add variation types and options for this service.</p>
                  </div>
                  {formData.variationTypes.map((variationType, typeIndex) => (
                    <div
                      key={typeIndex}
                      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                    >
                      <label
                        htmlFor={`variation-type-${typeIndex}`}
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Variation Type {typeIndex + 1}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg space-y-4">
                          <input
                            type="text"
                            name={`variation-type-name-${typeIndex}`}
                            id={`variation-type-name-${typeIndex}`}
                            value={variationType.name}
                            onChange={(e) => handleVariationTypeChange(typeIndex, "name", e.target.value)}
                            placeholder="Variation Type Name"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          />
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name={`variation-type-required-${typeIndex}`}
                              id={`variation-type-required-${typeIndex}`}
                              checked={variationType.required}
                              onChange={(e) => handleVariationTypeChange(typeIndex, "required", e.target.checked)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`variation-type-required-${typeIndex}`}
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Required
                            </label>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Options</h4>
                            {variationType.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option.name}
                                  onChange={(e) => handleVariationOptionChange(typeIndex, optionIndex, "name", e.target.value)}
                                  placeholder="Option Name"
                                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                />
                                <input
                                  type="text"
                                  value={option.description}
                                  onChange={(e) =>
                                    handleVariationOptionChange(typeIndex, optionIndex, "description", e.target.value)
                                  }
                                  placeholder="Option Description"
                                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeVariationOption(typeIndex, optionIndex)}
                                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <MinusCircleIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addVariationOption(typeIndex)}
                              className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <PlusIcon className="h-5 w-5 mr-1" />
                              Add Option
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:col-span-1">
                        <button
                          type="button"
                          onClick={() => removeVariationType(typeIndex)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-5 w-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={addVariationType}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      <PlusIcon className="h-5 w-5 mr-1" />
                      Add Variation Type
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main >
      </div >
    </div >
  )
}


export default ServiceEditForm

