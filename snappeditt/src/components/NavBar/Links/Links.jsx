"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

const Links = ({ closeMenu, isMobile = false }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const servicesRef = useRef(null)

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
    }

    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile])

  const handleLinkClick = () => {
    if (closeMenu) {
      closeMenu()
    }
  }

  return (
    <div className={`links ${isMobile ? "links-mobile" : ""}`}>
      <Link to="/" className="nav-link" onClick={handleLinkClick}>
        Home
      </Link>
      <Link to="/about-us" className="nav-link" onClick={handleLinkClick}>
        About
      </Link>

      <div className="services-menu" ref={servicesRef}>
        <button onClick={toggleServices} className="services-button" aria-expanded={isServicesOpen}>
          Services
          <svg
            className={`dropdown-icon ${isServicesOpen ? "rotate" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={`submenu ${isServicesOpen ? "submenu-open" : ""}`}>
          <Link to={"/services/real-estate"} onClick={handleLinkClick}>
            Real-Estate
          </Link>
          <Link to={"/services/3d-services"} onClick={handleLinkClick}>
            3D Services
          </Link>
          <Link to={"/services/wedding-events"} onClick={handleLinkClick}>
            Wedding Events
          </Link>
          <Link to={"/services/products-ecommerce"} onClick={handleLinkClick}>
            Products ~ eCommerce
          </Link>
          <Link to={"/services/people-retouching"} onClick={handleLinkClick}>
            People Retouching
          </Link>
          <Link to={"/services/clipping-path-extraction"} onClick={handleLinkClick}>
            Clipping Path ~ Extraction
          </Link>
          <Link to={"/services/custom-payment-service"} onClick={handleLinkClick}>
            Custom Payment
          </Link>
        </div>
      </div>
      <Link to="/contact-us" className="nav-link" onClick={handleLinkClick}>
        Contact
      </Link>
      <Link to="/login" className="nav-link" onClick={handleLinkClick}>
        Login
      </Link>
    </div>
  )
}

export default Links

