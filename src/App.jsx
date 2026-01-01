import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import { VisibilityProvider } from './context/VisibilityContext'
import './App.css'

function App() {
  return (
    <VisibilityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/:category" element={<Results />} />
        </Routes>
      </Router>
    </VisibilityProvider>
  )
}

export default App

