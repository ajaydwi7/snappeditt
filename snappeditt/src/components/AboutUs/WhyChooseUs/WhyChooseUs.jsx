import React from "react";
import SolutionIcon from "@/assets/images/icons/one-stop-solution.svg";
import relationIcon from "@/assets/images/icons/relationship.svg";
import StylingIcon from "@/assets/images/icons/styling-and-consistency.svg";
import TurnAroundIcon from "@/assets/images/icons/turnaround.svg";
import SecureIcon from "@/assets/images/icons/secure.svg";
import PricingIcon from "@/assets/images/icons/pricing.svg";

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            <span style={{ color: '#f44336' }}>Why Choose</span> Us?
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We are a professional post-production company based in Mumbai, India. We offer cost-effective post-production solutions to all photographers and companies dealing with Real Estate, Wedding, Commercial, Portraits, etc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={SolutionIcon} alt="One Stop Solution Icon" className="w-12 h-12 mx-auto" />
            </div>
            <h6 className="text-lg font-semibold text-center">One Stop Solution</h6>
            <p className="text-gray-600 text-center mt-2">
              We offer a wide range of Photo Editing Services that can be availed of by Photographers, Business, and individuals at a very competitive price with our hassle-free order system.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={StylingIcon} alt="Styling With Consistency Icon" className="w-12 h-12 mx-auto" />
            </div>
            <h6 className="text-lg font-semibold text-center">Parallel Styling With Consistency</h6>
            <p className="text-gray-600 text-center mt-2">
              Using Parallel Styling we assign a dedicated team that matches your editing style and provides quality and consistent results as per your needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={relationIcon} alt="Building Relations Icon" className="w-12 h-12 mx-auto" />
            </div>
            <h6 className="text-lg font-semibold text-center">Building Relations</h6>
            <p className="text-gray-600 text-center mt-2">
              A dedicated relationship manager as a single point of contact is assigned to fulfill your queries once you are onboarded.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={TurnAroundIcon} alt="Quick Turnaround Icon" className="w-12 h-12 mx-auto" />
            </div>
            <h6 className="text-lg font-semibold text-center">Quick Turnaround</h6>
            <p className="text-gray-600 text-center mt-2">
              With a team of 150+ editors/retouchers, we assure to deliver corrected images within 12hrs for Real-Estate and 24-48 hrs of turnaround time for other services served.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={PricingIcon} alt="Competitive Pricing and Billing Icon" className="w-12 h-12 mx-auto" />
            </div>
            <h6 className="text-lg font-semibold text-center">Competitive Pricing and Billing</h6>
            <p className="text-gray-600 text-center mt-2">
              Get Superior quality images and make more margins by saving money with our competitive prices. We also offer Weekly/Fortnightly/Monthly billing options to regular clients helping them to keep track of expenses.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
              <img src={SecureIcon} alt="Safe & Secure Icon" className="w-12 h-12 mx-auto block" />
            </div>
            <h6 className="text-lg font-semibold text-center">Safe & Secure</h6>
            <p className="text-gray-600 text-center mt-2">
              We follow a stringent privacy policy when it comes to the security of the images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
