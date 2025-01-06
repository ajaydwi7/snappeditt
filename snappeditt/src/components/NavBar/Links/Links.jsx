import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Links = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToProducts = () => {
    if (!isHomePage) return;
    const products = document.getElementById("products");
    products.scrollIntoView({ behavior: "smooth" });
    removeExpandedClass();
  };

  const removeExpandedClass = () => {
    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    mobileExpandedMenu.classList.remove("mobile-expanded");
  };

  return (
    <div className="links">
      <Link to={"/"} onClick={removeExpandedClass}>
        Home
      </Link>
      <Link to={"/about-us"} onClick={removeExpandedClass}>
        About Us
      </Link>
      <div className="services-menu">
        <a className="services-button">
          Services
        </a>
        <div className="submenu">
          <Link to={"/services/real-estate"} onClick={removeExpandedClass}>
            Real-Estate
          </Link>
          <Link to={"/services/3d-services"} onClick={removeExpandedClass}>
            3D Services
          </Link>
          <Link to={"/services/wedding-events"} onClick={removeExpandedClass}>
            Wedding Events
          </Link>
          <Link to={"/services/products-ecommerce"} onClick={removeExpandedClass}>
            Products ~ eCommerce
          </Link>
          <Link to={"/services/people-retouching"} onClick={removeExpandedClass}>
            People Retouching
          </Link>
          <Link to={"/services/clipping-path-extraction"} onClick={removeExpandedClass}>
            Clipping Path ~ Extraction
          </Link>
          <Link to={"/services/custom-payment-service"} onClick={removeExpandedClass}>
            Custom Payment
          </Link>
        </div>
      </div>
      <Link to={"/contact-us"} onClick={removeExpandedClass}>
        Contact Us
      </Link>
      <Link to={"/delivery"} onClick={removeExpandedClass}>
        Delivery
      </Link>
    </div>
  );
};

export default Links;
