import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

const Links = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const submenuRef = useRef(null);

  const scrollToProducts = () => {
    if (!isHomePage) return;
    const services = document.getElementById("services");
    services.scrollIntoView({ behavior: "smooth" });
    removeExpandedClass();
  };

  const removeExpandedClass = () => {
    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    mobileExpandedMenu.classList.remove("mobile-expanded");
  };

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const closeSubmenu = () => {
    setSubmenuOpen(false);
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        closeSubmenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="links">
      <Link to={"/"} onClick={removeExpandedClass}>
        Home
      </Link>
      <Link to={"/about-us"} onClick={removeExpandedClass}>
        About Us
      </Link>
      <div className="services-menu"
        ref={submenuRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <a className="services-button" onClick={toggleSubmenu}>
          Services
        </a>
        <div className={`submenu ${submenuOpen ? "submenu-open" : ""}`}>
          <Link to={"/services/real-estate"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            Real-Estate
          </Link>
          <Link to={"/services/3d-services"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            3D Services
          </Link>
          <Link to={"/services/wedding-events"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            Wedding Events
          </Link>
          <Link to={"/services/products-ecommerce"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            Products ~ eCommerce
          </Link>
          <Link to={"/services/people-retouching"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            People Retouching
          </Link>
          <Link to={"/services/clipping-path-extraction"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
            Clipping Path ~ Extraction
          </Link>
          <Link to={"/services/custom-payment-service"} onClick={() => { removeExpandedClass(); closeSubmenu(); }}>
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
