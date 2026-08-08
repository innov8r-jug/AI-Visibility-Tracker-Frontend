import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Checkbox,
    Grid,
    Card,
    CardContent,
    Fade,
} from '@mui/material'
import {
    Send as SendIcon,
    AutoAwesome as AutoAwesomeIcon,
    Business as BusinessIcon,
    Psychology as ModelIcon,
} from '@mui/icons-material'
import { analyzeVisibility } from '../services/api'
import WritesonicLogo from '../components/WritesonicLogo'
import { useVisibility } from '../context/VisibilityContext'
import './Home.css'

const AIMODELS = [
    {
        code: 'Gemini',
        label: 'Google Gemini',
        icon: '🤖',
        color: '#4285F4',
        description: 'Google\'s advanced AI model'
    },
    {
        code: 'Groq',
        label: 'Groq AI',
        icon: '⚡',
        color: '#00A86B',
        description: 'Ultra-fast AI inference'
    },
]

function Home() {
    const navigate = useNavigate()
    const { setDashboardData, setLoading, setCurrentPrompt } = useVisibility()

    const [prompt, setPrompt] = useState('')
    const [brands, setBrands] = useState('')
    const [selectedModels, setSelectedModels] = useState(['Gemini', 'Groq'])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleModelToggle = (modelCode) => {
        setSelectedModels((prev) =>
            prev.includes(modelCode)
                ? prev.filter((m) => m !== modelCode)
                : [...prev, modelCode]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt.trim()) {
            alert('Please enter a prompt to analyze.')
            return
        }

        if (!selectedModels || selectedModels.length === 0) {
            alert('Please select at least one AI model.')
            return
        }

        setIsSubmitting(true)
        setLoading(true)
        setCurrentPrompt(prompt)

        try {
            const brandList = brands.split(',').map((b) => b.trim()).filter((b) => b)

            const validModels = selectedModels.filter(model =>
                model === 'Gemini' || model === 'Groq'
            )

            // Assuming your api.js is updated to hit the new POST /api/visibility/analyze endpoint
            const result = await analyzeVisibility(prompt, brandList, validModels)

            setDashboardData(result)
            navigate('/results')

        } catch (error) {
            console.error('Error starting analysis:', error)
            alert('Error connecting to the AI models. Please try again.')
        } finally {
            setIsSubmitting(false)
            setLoading(false)
        }
    }

    return (
        <Box className="home-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)' }}>
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
                <Fade in={true} timeout={800}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: '#FFFFFF',
                            boxShadow: '0 10px 40px -10px rgba(59,0,255,0.1)',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        {/* Header Section */}
                        <Box sx={{ mb: 5, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <WritesonicLogo size={64} showText={true} />
                            </Box>
                            <Typography
                                variant="h3"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                                    letterSpacing: '-0.02em',
                                    color: '#0f172a'
                                }}
                            >
                                Generative Engine Optimization
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.1rem',
                                    maxWidth: '500px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    color: '#64748b'
                                }}
                            >
                                Enter a free-form query to track brand visibility across multiple LLMs in real-time.
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4}>
                                {/* Custom Prompt Input */}
                                <Grid item xs={12}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#3b00ff',
                                                boxShadow: '0 4px 12px rgba(59, 0, 255, 0.08)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <AutoAwesomeIcon sx={{ color: '#3b00ff', mr: 1, fontSize: 22 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                                    What is your target search prompt?
                                                </Typography>
                                            </Box>
                                            <TextField
                                                fullWidth
                                                placeholder="e.g., What are the best CRM tools for small businesses?"
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                required
                                                multiline
                                                rows={2}
                                                variant="standard"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { fontSize: '1.15rem', color: '#1e293b' }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Brands Input (Optional) */}
                                <Grid item xs={12}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#d536d6',
                                                boxShadow: '0 4px 12px rgba(213, 54, 214, 0.08)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <BusinessIcon sx={{ color: '#d536d6', mr: 1, fontSize: 20 }} />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                                    Specific Brands to Track (Optional)
                                                </Typography>
                                            </Box>
                                            <TextField
                                                fullWidth
                                                placeholder="e.g., Salesforce, HubSpot"
                                                value={brands}
                                                onChange={(e) => setBrands(e.target.value)}
                                                variant="standard"
                                                InputProps={{
                                                    disableUnderline: true,
                                                    sx: { fontSize: '1rem' }
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* AI Models Selection */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <ModelIcon sx={{ color: '#3b00ff', mr: 1, fontSize: 22 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                            Select AI Engines
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={2}>
                                        {AIMODELS.map((model) => {
                                            const isSelected = selectedModels.includes(model.code)
                                            return (
                                                <Grid item xs={12} sm={6} key={model.code}>
                                                    <Card
                                                        onClick={() => handleModelToggle(model.code)}
                                                        elevation={0}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            border: isSelected ? '2px solid' : '2px solid #e2e8f0',
                                                            borderColor: isSelected ? '#3b00ff' : '#e2e8f0',
                                                            borderRadius: 3,
                                                            transition: 'all 0.2s ease',
                                                            background: isSelected ? 'linear-gradient(135deg, rgba(59,0,255,0.05) 0%, rgba(59,0,255,0.02) 100%)' : '#ffffff',
                                                            '&:hover': {
                                                                borderColor: '#3b00ff',
                                                                transform: 'translateY(-2px)'
                                                            }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 2 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Box sx={{ fontSize: '1.8rem', mr: 2 }}>{model.icon}</Box>
                                                                    <Box>
                                                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                                                            {model.label}
                                                                        </Typography>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            {model.description}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Checkbox
                                                                    checked={isSelected}
                                                                    onChange={() => handleModelToggle(model.code)}
                                                                    sx={{ color: '#3b00ff', '&.Mui-checked': { color: '#3b00ff' } }}
                                                                />
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={isSubmitting || selectedModels.length === 0}
                                        startIcon={<SendIcon />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #3b00ff 0%, #6d28d9 100%)',
                                            py: 2,
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            textTransform: 'none',
                                            boxShadow: '0 4px 14px rgba(59,0,255,0.3)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #2a00b3 0%, #5b21b6 100%)',
                                                boxShadow: '0 6px 20px rgba(59,0,255,0.4)',
                                                transform: 'translateY(-2px)',
                                            },
                                            '&:disabled': {
                                                background: '#e2e8f0',
                                                color: '#94a3b8'
                                            }
                                        }}
                                    >
                                        {isSubmitting ? 'Running Parallel Scatter-Gather Engine...' : 'Analyze GEO Visibility'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    )
}

export default Home