import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import WritesonicLogo from '../components/WritesonicLogo'
import Dashboard from '../components/Dashboard'
import { useVisibility } from '../context/VisibilityContext'
import './Results.css'

function Results() {
  const navigate = useNavigate()
  const { dashboardData, loading, currentPrompt } = useVisibility()

  // If the user navigates directly to /results without submitting a prompt, send them home
  useEffect(() => {
    if (!loading && !dashboardData && !currentPrompt) {
      navigate('/')
    }
  }, [loading, dashboardData, currentPrompt, navigate])

  if (loading) {
    return (
        <Box className="results-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <WritesonicLogo size={60} showText={false} />
          <CircularProgress size={50} sx={{ color: '#3b00ff', mt: 4, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
            Querying AI Engines...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Executing scatter-gather pipeline across selected LLMs.
          </Typography>
        </Box>
    )
  }

  return (
      <Box className="results-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          {/* Header Navigation */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/')}
                  sx={{ color: '#64748b', fontWeight: 600, '&:hover': { color: '#3b00ff', background: 'transparent' } }}
              >
                New Search
              </Button>
            </Box>
            <WritesonicLogo size={45} showText={true} />
          </Box>

          {/* Dashboard Component handles the rendering of data */}
          <Dashboard data={dashboardData} />
        </Container>
      </Box>
  )
}

export default Results