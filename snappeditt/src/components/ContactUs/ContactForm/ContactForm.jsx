"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  Checkbox,
  Textarea,
  Button,
} from "@relume_io/relume-ui";

// Define default values for the ContactForm
export const Contact2Defaults = {
  heading: "Feel free to contact us for more information",
  description: "We are here to help you. Please fill out the form below.",
  button: { title: "Submit" },
};

// Define the ContactForm component
const ContactForm = (props) => {
  const { heading, description, button } = {
    ...Contact2Defaults,
    ...props,
  };

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!acceptTerms) {
      setStatusMessage("You must accept the terms to proceed.");
      return;
    }

    const formData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      phone: phoneInput,
      topic: selectedItem,
      message: messageInput,
      acceptTerms,
    };

    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit-contact-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage("Form submitted successfully!");
        resetForm();
      } else {
        setStatusMessage("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPhoneInput("");
    setSelectedItem("");
    setMessageInput("");
    setAcceptTerms(false);
  };

  const selectItems = [
    { value: "real-estate", label: "Real Estate" },
    { value: "3d-services", label: "3D Services" },
    { value: "wedding-events", label: "Wedding & Events" },
    { value: "ecommerce-products", label: "Products eCommerce" },
    { value: "people-retouching", label: "People Retouching" },
    { value: "clipping-path", label: "Clipping Path Extraction" },
    { value: "others", label: "Others" },
  ];

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="mx-auto mb-8 w-full max-w-lg text-center md:mb-10 lg:mb-12">
          <h2 className="form-heading rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-6xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <form
          className="grid grid-cols-1 grid-rows-[auto_auto] gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="firstName" className="mb-2">
                First name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="firstName"
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="lastName" className="mb-2">
                Last name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="lastName"
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="phone" className="mb-2">
                Phone number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="phone"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid w-full items-center">
            <Label className="mb-2">
              Choose a topic <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setSelectedItem}>
              <SelectTrigger>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                {selectItems.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center">
            <Label htmlFor="message" className="mb-2">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              className="min-h-[11.25rem] overflow-auto"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>

          <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={setAcceptTerms}
            />
            <Label htmlFor="terms" className="cursor-pointer">
              I accept the{" "}
              <a
                className="text-link-primary underline"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
            </Label>
          </div>

          {statusMessage && (
            <p className="text-center text-red-500">{statusMessage}</p>
          )}

          <div className="text-center">
            <Button
              className={`btn-submit ${loading ? "bg-black text-white" : "bg-primaryRed text-white"
                }`}
              disabled={loading}
              {...button}
            >
              {loading ? "Submitting..." : button.title}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Default export for the ContactForm component
export default ContactForm;
