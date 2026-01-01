import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Fade,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import { 
  Send as SendIcon, 
  Category as CategoryIcon,
  Business as BusinessIcon,
  Psychology as ModelIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'
import { analyzeVisibility } from '../services/api'
import WritesonicLogo from '../components/WritesonicLogo'
import { getCategoryKey, getCategoryDisplayNames } from '../utils/categories'
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
  const [category, setCategory] = useState('')
  const [brands, setBrands] = useState('')
  const [selectedModels, setSelectedModels] = useState(['Gemini', 'Groq'])
  const [loading, setLoading] = useState(false)
  const categoryOptions = getCategoryDisplayNames()

  const handleModelToggle = (modelCode) => {
    setSelectedModels((prev) =>
      prev.includes(modelCode)
        ? prev.filter((m) => m !== modelCode)
        : [...prev, modelCode]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!category || !brands) {
      alert('Please fill in both category and brands')
      return
    }

    if (!selectedModels || selectedModels.length === 0) {
      alert('Please select at least one AI model')
      return
    }

    setLoading(true)
    try {
      const brandList = brands.split(',').map((b) => b.trim()).filter((b) => b)
      
      // Validate and ensure we're sending correct model codes
      const validModels = selectedModels.filter(model => 
        model === 'Gemini' || model === 'Groq'
      )
      
      if (validModels.length === 0) {
        alert('Please select valid AI models (Gemini or Groq)')
        setLoading(false)
        return
      }

      // Convert display name to camelCase key for database
      const categoryKey = getCategoryKey(category)

      console.log('Sending analysis request:', {
        category: categoryKey,
        categoryDisplay: category,
        brands: brandList,
        aiModels: validModels
      })

      await analyzeVisibility(categoryKey, brandList, validModels)
      // Wait a bit for analysis to start, then navigate
      // Use camelCase key in URL for consistency
      setTimeout(() => {
        navigate(`/results/${encodeURIComponent(categoryKey)}`)
      }, 1000)
    } catch (error) {
      console.error('Error starting analysis:', error)
      alert('Error starting analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="home-container">
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4,
              background: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Header Section with Writesonic Logo */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <WritesonicLogo size={56} showText={true} />
              </Box>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                  color: '#1F2937'
                }}
              >
                AI Search Tracking
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 1,
                  fontSize: '1rem',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  color: '#6B7280'
                }}
              >
                Track your brand's visibility across AI platforms. See where you rank
                and how often you're mentioned.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem',
                  color: '#9CA3AF',
                  fontStyle: 'italic'
                }}
              >
                Join 500+ brands enhancing their AI visibility
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Category Selection */}
                <Grid item xs={12}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      border: '2px solid #E5E7EB',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        borderColor: '#7C3AED',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon sx={{ color: '#7C3AED', mr: 1, fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
                          Category
                        </Typography>
                      </Box>
                      <FormControl fullWidth required sx={{ position: 'relative', zIndex: 1 }}>
                        <Select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          displayEmpty
                          sx={{
                            fontSize: '1.1rem',
                            fontWeight: category ? 500 : 400,
                            color: category ? '#1F2937' : '#9CA3AF',
                            cursor: 'pointer',
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                            '& .MuiSelect-select': {
                              py: 0.5,
                              px: 0,
                              cursor: 'pointer',
                            },
                            '& .MuiSvgIcon-root': {
                              color: '#7C3AED',
                              cursor: 'pointer',
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                borderRadius: 2,
                                mt: 1,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                maxHeight: 300,
                                zIndex: 1300,
                              },
                            },
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left',
                            },
                          }}
                          renderValue={(selected) => {
                            if (!selected) {
                              return <Typography sx={{ color: '#9CA3AF', fontSize: '1.1rem' }}>Select a category</Typography>
                            }
                            return <Typography sx={{ fontSize: '1.1rem', color: '#1F2937' }}>{selected}</Typography>
                          }}
                        >
                          {categoryOptions.map((option) => (
                            <MenuItem 
                              key={option} 
                              value={option} 
                              sx={{ 
                                fontSize: '1rem', 
                                py: 1.5, 
                                px: 2,
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#F3F4F6',
                                },
                              }}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Brands Input */}
                <Grid item xs={12}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      border: '2px solid #E5E7EB',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#7C3AED',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <BusinessIcon sx={{ color: '#7C3AED', mr: 1, fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
                          Brands to Track
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        placeholder="e.g., Salesforce, HubSpot, Pipedrive, Zoho"
                        value={brands}
                        onChange={(e) => setBrands(e.target.value)}
                        required
                        multiline
                        rows={2}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          sx: { fontSize: '1.1rem', pt: 0.5 }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Separate multiple brands with commas
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* AI Models Selection */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ModelIcon sx={{ color: '#7C3AED', mr: 1, fontSize: 22 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#374151' }}>
                        Select AI Models
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {AIMODELS.map((model) => {
                        const isSelected = selectedModels.includes(model.code)
                        return (
                          <Grid item xs={12} sm={6} key={model.code}>
                            <Card
                              onClick={() => handleModelToggle(model.code)}
                              sx={{
                                cursor: 'pointer',
                                border: isSelected ? '2px solid' : '2px solid #E5E7EB',
                                borderColor: isSelected ? '#7C3AED' : '#E5E7EB',
                                borderRadius: 3,
                                transition: 'all 0.3s ease',
                                background: isSelected 
                                  ? `linear-gradient(135deg, ${model.color}15 0%, ${model.color}08 100%)`
                                  : 'transparent',
                                '&:hover': {
                                  borderColor: '#7C3AED',
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
                                }
                              }}
                            >
                              <CardContent sx={{ p: 2.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <Box 
                                      sx={{ 
                                        fontSize: '2rem', 
                                        mr: 2,
                                        width: 48,
                                        height: 48,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '12px',
                                        background: isSelected 
                                          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)'
                                          : '#F3F4F6'
                                      }}
                                    >
                                      {model.icon}
                                    </Box>
                                    <Box>
                                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
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
                                    sx={{
                                      color: '#7C3AED',
                                      '&.Mui-checked': {
                                        color: '#7C3AED',
                                      }
                                    }}
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading || selectedModels.length === 0}
                    startIcon={<SendIcon />}
                    sx={{
                      background: '#7C3AED',
                      py: 1.75,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
                      '&:hover': {
                        background: '#6D28D9',
                        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.5)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: '#E5E7EB',
                        color: '#9CA3AF'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Analyzing...' : 'Start Analysis'}
                  </Button>
                  {selectedModels.length === 0 && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                      Please select at least one AI model
                    </Typography>
                  )}
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
