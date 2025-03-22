"use client"

import { useState } from "react"
import Account from "./Account/Account"
import Links from "./Links/Links"
import Logo from "./Logo/Logo"
import Hamburger from "hamburger-react"
import "./NavBar.css"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleHamClick = () => {
    setIsOpen(!isOpen)
    document.body.classList.toggle("no-scroll")
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.classList.remove("no-scroll")
    document.documentElement.classList.remove("no-scroll")
  }

  return (
    <div className="sub-container nav-main">
      <div className="nav-container">
        <Logo />

        <span className="desktop-links">
          <Links closeMenu={closeMenu} />
        </span>

        <Account closeMenu={closeMenu} />

        <button type="button" className="hamburger" aria-label="Toggle navigation menu" onClick={handleHamClick}>
          <Hamburger size={24} color="#fff" toggled={isOpen} rounded />
        </button>
      </div>

      <div className="nav-mobile">
        <div className={`mobile-expanded-menu ${isOpen ? "mobile-expanded" : ""}`}>
          <Links closeMenu={closeMenu} isMobile={true} />
        </div>
      </div>
    </div>
  )
}

export default NavBar

