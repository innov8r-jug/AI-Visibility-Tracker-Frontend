import React, { createContext, useContext, useState, useEffect } from 'react'

const VisibilityContext = createContext()

export const useVisibility = () => {
    const context = useContext(VisibilityContext)
    if (!context) {
        throw new Error('useVisibility must be used within a VisibilityProvider')
    }
    return context
}

export const VisibilityProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [dashboardData, setDashboardData] = useState(() => {
        const saved = localStorage.getItem('ai_visibility_dashboard')
        return saved ? JSON.parse(saved) : null
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [currentPrompt, setCurrentPrompt] = useState(() => {
        return localStorage.getItem('ai_visibility_prompt') || null
    })

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (dashboardData) {
            localStorage.setItem('ai_visibility_dashboard', JSON.stringify(dashboardData))
        } else {
            localStorage.removeItem('ai_visibility_dashboard')
        }
    }, [dashboardData])

    useEffect(() => {
        if (currentPrompt) {
            localStorage.setItem('ai_visibility_prompt', currentPrompt)
        } else {
            localStorage.removeItem('ai_visibility_prompt')
        }
    }, [currentPrompt])

    return (
        <VisibilityContext.Provider
            value={{
                dashboardData,
                setDashboardData,
                loading,
                setLoading,
                error,
                setError,
                currentPrompt,
                setCurrentPrompt,
            }}
        >
            {children}
        </VisibilityContext.Provider>
    )
}