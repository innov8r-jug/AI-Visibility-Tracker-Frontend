import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import { VisibilityProvider } from './context/VisibilityContext'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
    return (
        <VisibilityProvider>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </VisibilityProvider>
    )
}

export default App