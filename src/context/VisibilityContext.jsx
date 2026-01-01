import React, { createContext, useContext, useState } from 'react'

const VisibilityContext = createContext()

export const useVisibility = () => {
  const context = useContext(VisibilityContext)
  if (!context) {
    throw new Error('useVisibility must be used within VisibilityProvider')
  }
  return context
}

export const VisibilityProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentCategory, setCurrentCategory] = useState(null)

  return (
    <VisibilityContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        loading,
        setLoading,
        error,
        setError,
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  )
}

