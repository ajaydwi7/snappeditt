import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ScrollToTopButton from "./components/GlobalComponents/ScrollToTopButton/ScrollToTopButton";
import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import NavBar from "@/components/NavBar/NavBar";
import ShopFooter from "@/components/Footer/ShopFooter";
import ErrorView from "./views/ErrorView";
import CartView from "./views/CartView";
import DeliveryView from "./views/DeliveryView";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { ToastContainer } from "react-toastify";
import Modal from "@/components/Modals/Modal";
import CancelOrder from "@/components/Modals/CancelOrder";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/GlobalContext/Loader";
import RealStateView from "./views/Services/RealStateView";
import ThreeDServicesView from "./views/Services/ThreeDServicesView";
import WeddingEventsView from "./views/Services/WeddingEventsView";
import ProductECommerceView from "./views/Services/ProductsEcommerceView";
import PeopleRetouchingView from "./views/Services/PeopleRetouchingView";
import ClippingPathExtractionView from "./views/Services/ClippingPathExtractionView";
import ContactUsView from "./views/ContactUsView";
import AdminRoutes from "./admin/routes/AdminRoutes";
import ProductPage from "./components/GlobalComponents/ProductModal/ProductPage";
import ServicePage from "./components/OurServices/RealState/ServicePage";
import Login from "./views/Login";
import Register from "./views/Register";
// import RequestCookie from "./components/CookieBanner/CookieBanner";

function App() {
  const [loading, setLoading] = useState(true); // Add loader state
  const { orders, modal } = useGlobalContext();

  // Fetch products and manage loading state
  useEffect(() => {
    const fetchServices = async () => {
      if (orders.state && orders.state.services && orders.state.services.length === 0) {
        await orders.fetchOrders();
      }
      setLoading(false); // Set loading to false once products are fetched
    };

    fetchServices();
  }, [orders]);

  const navigate = useNavigate();
  return (
    <div>
      {loading ? (
        // Display loader while loading is true
        <Loader duration={5000} />
      ) : (
        <>
          <ScrollToTopButton />
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/about-us" element={<AboutView />} />
            <Route path="/services/real-estate" element={<RealStateView />} />
            <Route path="services/:categorySlug/:serviceSlug" element={<ServicePage />} />
            <Route path="/services/real-estate/day-to-dusk" element={<ProductPage />} />
            <Route path="/services/3d-services" element={<ThreeDServicesView />} />
            <Route path="/services/wedding-events" element={<WeddingEventsView />} />
            <Route path="/services/products-ecommerce" element={<ProductECommerceView />} />
            <Route path="/services/people-retouching" element={<PeopleRetouchingView />} />
            <Route path="/services/clipping-path-extraction" element={<ClippingPathExtractionView />} />
            <Route path="/contact-us" element={<ContactUsView />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/delivery" element={<DeliveryView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
          <footer>
            <ShopFooter />
          </footer>
        </>
      )}

      {/* Display Modal when needed */}
      {modal.opened && (
        <Modal
          header={modal.isRegister ? "Create Account" : "Login"}
          submitAction={() => { }}
          buttonText={modal.isRegister ? "Create Account" : "Login"}
          isRegister={modal.isRegister}
          onClose={() => {
            modal.closeModal(); // Close modal
            navigate("/"); // Navigate to home or desired route
          }}
        />
      )}
      {/* Display CancelOrder modal when required */}
      {modal.isCancelModal && <CancelOrder />}

      <ToastContainer />
      {/* Uncomment this if you want to show the cookie banner */}
      {/* <RequestCookie /> */}
    </div>
  );
}

export default App;
