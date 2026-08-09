import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    Grid,
    Card,
    CardContent,
    Fade,
    CircularProgress,
    Backdrop,
    Paper,
    Alert,
} from '@mui/material'
import {
    Send as SendIcon,
    AutoAwesome as AutoAwesomeIcon,
    Business as BusinessIcon,
    Psychology as ModelIcon,
    CheckCircleRounded as CheckIcon,
    HourglassEmpty as PendingIcon,
} from '@mui/icons-material'
import { analyzeVisibility } from '../services/api'
import WritesonicLogo from '../components/WritesonicLogo'
import { useVisibility } from '../context/VisibilityContext'

const AIMODELS = [
    { code: 'Gemini', label: 'Google Gemini', icon: '🤖', description: 'Google\'s advanced AI model' },
    { code: 'Groq', label: 'Groq AI', icon: '⚡', description: 'Ultra-fast AI inference' },
    { code: 'Cerebras', label: 'Cerebras AI', icon: '🧠', description: 'Ultra-fast wafer-scale inference' },
    { code: 'Cohere', label: 'Cohere AI', icon: '🔮', description: 'Enterprise-grade language model' },
]

function Home() {
    const navigate = useNavigate()
    const { setDashboardData, setLoading: setGlobalLoading, setCurrentPrompt, error, setError } = useVisibility()

    const [prompt, setPrompt] = useState('')
    const [brands, setBrands] = useState('')
    const [selectedModels, setSelectedModels] = useState(['Gemini', 'Groq', 'Cerebras', 'Cohere'])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        'Dispatching parallel scatter-gather requests to LLM APIs...',
        'Parsing structured responses & extracting entities...',
        'Persisting telemetry & calculating Share of Model (SoM)...',
        'Rendering enterprise analytics dashboard...'
    ]

    const handleModelToggle = (modelCode) => {
        setSelectedModels((prev) =>
            prev.includes(modelCode) ? prev.filter((m) => m !== modelCode) : [...prev, modelCode]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!prompt.trim()) {
            setError('Please enter a prompt to analyze.')
            return
        }
        if (selectedModels.length === 0) {
            setError('Please select at least one AI model.')
            return
        }

        setIsSubmitting(true)
        setGlobalLoading(true)
        setCurrentPrompt(prompt)

        // Simulate smooth professional progress steps for the overlay modal
        const stepInterval = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
        }, 1200)

        try {
            const brandList = brands.split(',').map((b) => b.trim()).filter((b) => b)
            const result = await analyzeVisibility(prompt, brandList, selectedModels)

            clearInterval(stepInterval)
            setActiveStep(steps.length - 1)

            // Brief pause on final step before redirecting smoothly
            setTimeout(() => {
                setDashboardData(result)
                setGlobalLoading(false)
                navigate('/results')
            }, 600)

        } catch (err) {
            clearInterval(stepInterval)
            console.error('Error starting analysis:', err)
            setError('Error connecting to AI engines. Ensure the backend is running and reachable.')
            setIsSubmitting(false)
            setGlobalLoading(false)
            setActiveStep(0)
        }
    }

    return (
        <Box className="home-container" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', minHeight: '100vh', py: 6 }}>
            {/* Professional Full-Screen Loading Backdrop Modal */}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    flexDirection: 'column',
                    gap: 3,
                }}
                open={isSubmitting}
            >
                <WritesonicLogo size={64} showText={false} />
                <CircularProgress size={56} sx={{ color: '#00d2ff' }} />
                <Box sx={{ textAlign: 'center', maxWidth: 450, px: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#f8fafc' }}>
                        Executing Generative Engine Optimization
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8', minHeight: '3rem', fontWeight: 500 }}>
                        {steps[activeStep]}
                    </Typography>
                </Box>
            </Backdrop>

            <Container maxWidth="md">
                <Fade in={true} timeout={800}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: '#FFFFFF',
                            boxShadow: '0 10px 40px -10px rgba(59,0,255,0.08)',
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
                                Enter a query to benchmark real-time brand visibility across concurrent LLMs.
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

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
                                            '&:hover': { borderColor: '#3b00ff', boxShadow: '0 4px 12px rgba(59, 0, 255, 0.08)' }
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
                                                placeholder="e.g., What are the best CRM tools in the market?"
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

                                {/* Brands Input */}
                                <Grid item xs={12}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': { borderColor: '#d536d6', boxShadow: '0 4px 12px rgba(213, 54, 214, 0.08)' }
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
                                                            border: isSelected ? '2px solid #3b00ff' : '2px solid #e2e8f0',
                                                            borderRadius: 3,
                                                            transition: 'all 0.2s ease',
                                                            background: isSelected ? 'linear-gradient(135deg, rgba(59,0,255,0.05) 0%, rgba(59,0,255,0.02) 100%)' : '#ffffff',
                                                            '&:hover': { borderColor: '#3b00ff', transform: 'translateY(-2px)' }
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
                                        Analyze GEO Visibility
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