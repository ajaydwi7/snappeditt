"use client"

import { FaShoppingCart } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext"
import { Link } from "react-router-dom"
import FreeTrialPanel from "../../FreeTrialPanel/FreeTrialPanel"
import "./Account.css"

const Account = ({ closeMenu }) => {
  const { auth, serviceStore } = useGlobalContext()
  const cartTotal = serviceStore.state.cartQuantity
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev)
    if (closeMenu) closeMenu()
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="account">
      <div className="cart">
        <Link to={"/cart"} className="contains-link-to-accounts">
          <span className="account-details text-primaryBlack">
            <FaShoppingCart />
            {cartTotal > 0 && <span className="items-in-cart">{cartTotal}</span>}
          </span>
        </Link>
      </div>

      <div className="user-menu" ref={dropdownRef}>
        {auth.state.user ? (
          <div className="profile-dropdown">
            <button
              className="profile-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-label="User menu"
            >
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${auth.state.user.username}&backgroundColor=f44336`}
                alt="Profile"
                className="profile-avatar-sm"
              />
            </button>

            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <Link to="/user" onClick={() => setIsDropdownOpen(false)}>
                Profile
              </Link>
              <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
                My Orders
              </Link>
              <button onClick={auth.logout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-rounded px-6 py-4 border-2 font-semibold hover:border-primaryRed hover:bg-white hover:text-primaryRed transition duration-300"
          >
            Login
          </Link>
        )}
      </div>

      {/* Free Trial Button */}
      <div className="free-trial">
        <button
          onClick={togglePanel}
          className="btn-rounded px-6 py-4 border-2 font-semibold hover:border-primaryRed hover:bg-white hover:text-primaryRed transition duration-300"
        >
          Free Trial
        </button>
        <FreeTrialPanel isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
      </div>
    </div>
  )
}

export default Account

