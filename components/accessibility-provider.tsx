"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type AccessibilityContextType = {
  largeText: boolean
  toggleLargeText: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  largeText: false,
  toggleLargeText: () => {},
})

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [largeText, setLargeText] = useState(false)

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("largeText")
    if (savedPreference) {
      setLargeText(savedPreference === "true")
    }
  }, [])

  // Apply large text class to html element
  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add("large-text")
    } else {
      document.documentElement.classList.remove("large-text")
    }

    // Save preference to localStorage
    localStorage.setItem("largeText", String(largeText))
  }, [largeText])

  const toggleLargeText = () => {
    setLargeText((prev) => !prev)
  }

  return (
    <AccessibilityContext.Provider value={{ largeText, toggleLargeText }}>{children}</AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)

