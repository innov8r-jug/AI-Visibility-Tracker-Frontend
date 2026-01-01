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
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
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
  
  // Decode the category from URL (handles %20 and other encoded characters)
  // Category in URL is camelCase, convert to display name
  const categoryKey = categoryParam ? decodeURIComponent(categoryParam) : ''
  const category = getCategoryDisplay(categoryKey)

  useEffect(() => {
    let isMounted = true
    let intervalId = null

    const fetchData = async () => {
      try {
        // Only show loading on first fetch
        if (!dashboardData) {
          setLoading(true)
        }
        console.log('Fetching dashboard data for category:', categoryKey)
        // Send camelCase key to API
        const data = await getDashboardData(categoryKey)
        console.log('Dashboard data received:', data)
        if (isMounted) {
          setDashboardData(data)
          setLoading(false)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          category: categoryKey
        })
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'Failed to load dashboard data')
          setLoading(false)
        }
      }
    }

    // Only fetch if we have a category
    if (categoryKey) {
      // Initial fetch
      fetchData()
      
      // Poll for updates every 30 seconds (reduced from 5 seconds to reduce DB load)
      // Only poll if we have data (analysis might still be running)
      intervalId = setInterval(() => {
        if (isMounted) {
          fetchData()
        }
      }, 30000) // 30 seconds instead of 5
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
  }, [categoryKey])

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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ArrowBackIcon
              sx={{ cursor: 'pointer', color: '#6B7280', '&:hover': { color: '#7C3AED' } }}
              onClick={() => navigate('/')}
            />
            <WritesonicLogo size={40} showText={true} />
          </Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#1F2937' }}>
            AI Search Tracking Dashboard
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ color: '#6B7280', mb: 1 }}>
            Category
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
            {category || 'Loading...'}
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3,
            borderRadius: 3,
            border: '1px solid #E5E7EB',
            background: '#FFFFFF'
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={(e, v) => setTabValue(v)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                color: '#6B7280',
                '&.Mui-selected': {
                  color: '#7C3AED',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#7C3AED',
              }
            }}
          >
            <Tab label="General" />
            <Tab label="Platforms" />
            <Tab label="Competitors" />
          </Tabs>
        </Paper>

        {dashboardData ? (
          <Dashboard data={dashboardData} tabValue={tabValue} />
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
