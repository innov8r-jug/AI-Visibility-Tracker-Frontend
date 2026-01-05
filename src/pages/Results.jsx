import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Button,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import { getDashboardData } from '../services/api'
import WritesonicLogo from '../components/WritesonicLogo'
import Dashboard from '../components/Dashboard'
import { getCategoryDisplay } from '../utils/categories'
import './Results.css'

function Results() {
  const { category: categoryParam } = useParams()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [isPolling, setIsPolling] = useState(true)
  
  // Decode the category from URL (handles %20 and other encoded characters)
  // Category in URL is the display name, convert to camelCase for API if needed, but backend handles both
  const category = categoryParam ? decodeURIComponent(categoryParam) : ''
  const categoryDisplay = getCategoryDisplay(category) // Get display name for UI

  useEffect(() => {
    let isMounted = true
    let intervalId = null
    let pollAttempts = 0
    const MAX_POLL_ATTEMPTS = 20 // Stop polling after 20 attempts (10 minutes at 30s intervals)
    const POLL_INTERVAL = 30000 // 30 seconds

    const fetchData = async () => {
      try {
        // Only show loading on first fetch
        if (!dashboardData) {
          setLoading(true)
        }
        const data = await getDashboardData(category)
        if (isMounted) {
          setDashboardData(data)
          setLoading(false)
          setError(null)
          
          // Stop polling if we have data with prompts (analysis is complete)
          if (data && data.metrics && data.metrics.totalPrompts > 0) {
            console.log('Analysis complete - stopping polling')
            if (intervalId) {
              clearInterval(intervalId)
              intervalId = null
            }
            setIsPolling(false)
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          category: category
        })
        if (isMounted) {
          // Only set error on first fetch or if it's a persistent error
          if (!dashboardData || err.response?.status === 404) {
            setError(err.response?.data?.message || err.message || 'Failed to load dashboard data')
            setLoading(false)
            // Stop polling on persistent errors (like 404)
            if (err.response?.status === 404 && intervalId) {
              console.log('Category not found - stopping polling')
              clearInterval(intervalId)
              intervalId = null
              setIsPolling(false)
            }
          }
        }
      }
    }

    // Only fetch if we have a category
    if (category) {
      // Initial fetch
      fetchData()
      
      // Poll for updates (only if analysis might still be running)
      // Stop after MAX_POLL_ATTEMPTS to avoid infinite polling
      intervalId = setInterval(() => {
        if (isMounted) {
          pollAttempts++
          if (pollAttempts >= MAX_POLL_ATTEMPTS) {
            console.log('Max poll attempts reached - stopping polling')
            clearInterval(intervalId)
            intervalId = null
            setIsPolling(false)
            return
          }
          fetchData()
        }
      }, POLL_INTERVAL)
    } else {
      setError('No category specified')
      setLoading(false)
    }

    return () => {
      isMounted = false
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [category]) // Depend on the decoded category

  if (loading && !dashboardData) {
    return (
      <Box className="results-container">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="results-container">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ArrowBackIcon
              sx={{ cursor: 'pointer', color: '#6B7280', '&:hover': { color: '#7C3AED' } }}
              onClick={() => navigate('/')}
            />
            <WritesonicLogo size={40} showText={true} />
          </Box>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              border: '1px solid #FEE2E2',
              background: '#FEF2F2'
            }}
          >
            <Typography variant="h6" color="error" sx={{ mb: 2, fontWeight: 600 }}>
              Error Loading Dashboard
            </Typography>
            <Typography color="error" sx={{ mb: 3 }}>
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Category: {category || 'Not specified'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                background: '#7C3AED',
                '&:hover': {
                  background: '#6D28D9',
                }
              }}
            >
              Go Back to Home
            </Button>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box className="results-container">
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Header with Project Name */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Left side - Back button and Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <ArrowBackIcon
              sx={{ cursor: 'pointer', color: '#6B7280', '&:hover': { color: '#7C3AED' } }}
              onClick={() => navigate('/')}
            />
            <WritesonicLogo size={40} showText={true} />
          </Box>
          
          {/* Center - Project Name with Animation */}
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography 
              variant="h4" 
              component="h1" 
              className="animated-title"
              sx={{ 
                fontWeight: 700, 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 50%, #9333EA 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 3s ease infinite',
                textAlign: 'center',
              }}
            >
              AI Visibility Tracker
            </Typography>
          </Box>
          
          {/* Right side - Refresh Button */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={async () => {
                setLoading(true)
                try {
                  const data = await getDashboardData(category)
                  setDashboardData(data)
                  setError(null)
                } catch (err) {
                  setError(err.response?.data?.message || err.message || 'Failed to refresh')
                } finally {
                  setLoading(false)
                }
              }}
              sx={{
                borderColor: '#7C3AED',
                color: '#7C3AED',
                '&:hover': {
                  borderColor: '#6D28D9',
                  color: '#6D28D9',
                }
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {/* Category Display */}
        <Box 
          sx={{ 
            mb: 2,
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #bae6fd',
          }}
        >
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.75rem' }}>
            Category
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
            {categoryDisplay || category || 'Loading...'}
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 1.5, 
            mb: 2,
            borderRadius: 3,
            border: '1px solid #E5E7EB',
            background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, v) => {
              console.log('Tab changed to:', v)
              setTabValue(v)
            }}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                color: '#6B7280',
                fontSize: '0.95rem',
                minHeight: 44,
                px: 3,
                '&.Mui-selected': {
                  color: '#7C3AED',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#7C3AED',
                height: 3,
                borderRadius: '3px 3px 0 0',
              }
            }}
          >
            <Tab label="General" />
            <Tab label="Platforms" />
            <Tab label="Competitors" />
          </Tabs>
        </Paper>

        {dashboardData ? (
          <Box key={tabValue} sx={{ animation: 'fadeIn 0.3s ease-in' }}>
            <Dashboard data={dashboardData} tabValue={tabValue} />
          </Box>
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 3,
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No Data Available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The dashboard data for this category is not available yet. Please check back later or start a new analysis.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                background: '#7C3AED',
                '&:hover': {
                  background: '#6D28D9',
                }
              }}
            >
              Start New Analysis
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default Results
