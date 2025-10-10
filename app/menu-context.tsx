"use client"

import React, { createContext, useState, useContext } from "react"

const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
})

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  return useContext(MenuContext)
}
