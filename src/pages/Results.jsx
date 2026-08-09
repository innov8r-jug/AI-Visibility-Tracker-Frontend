import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Button,
    Alert,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import WritesonicLogo from '../components/WritesonicLogo'
import Dashboard from '../components/Dashboard'
import { useVisibility } from '../context/VisibilityContext'

function Results() {
    const navigate = useNavigate()
    const { dashboardData, setDashboardData, loading, error, setError } = useVisibility()

    // On mount/refresh, check if data exists in localStorage if context is empty
    useEffect(() => {
        if (!dashboardData) {
            const saved = localStorage.getItem('ai_visibility_dashboard')
            if (saved) {
                try {
                    setDashboardData(JSON.parse(saved))
                } catch (e) {
                    console.error('Failed to parse local storage data', e)
                    setError('Could not restore your previous results. Please run a new search.')
                    navigate('/')
                }
            } else {
                navigate('/')
            }
        }
    }, [dashboardData, setDashboardData, setError, navigate])

    if (loading) {
        return (
            <Box className="results-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <WritesonicLogo size={60} showText={false} />
                <CircularProgress size={50} sx={{ color: '#3b00ff', mt: 4, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Querying AI Engines...
                </Typography>
            </Box>
        )
    }

    return (
        <Box className="results-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/')}
                        sx={{ color: '#64748b', fontWeight: 600, '&:hover': { color: '#3b00ff', background: 'transparent' } }}
                    >
                        New Search
                    </Button>
                    <WritesonicLogo size={45} showText={true} />
                </Box>

                {error && (
                    <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Dashboard data={dashboardData} />
            </Container>
        </Box>
    )
}

export default Results