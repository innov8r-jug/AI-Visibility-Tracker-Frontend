import React from 'react'
import {
  Paper,
  Grid,
  Typography,
  Box,
  CircularProgress,
  LinearProgress,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Link as LinkIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material'

function MetricsCard({ metrics, brandMetrics }) {
  const calculateAverageVisibility = () => {
    if (!brandMetrics || brandMetrics.length === 0) return 0
    const sum = brandMetrics.reduce((acc, bm) => acc + (bm.visibilityScore || 0), 0)
    return sum / brandMetrics.length
  }

  const totalPagesCited = metrics?.totalCitations || 0
  const averageVisibility = calculateAverageVisibility()

  return (
    <Grid container spacing={3}>
      {/* Brand Presence */}
      <Grid item xs={12} md={3}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(102, 126, 234, 0.4)',
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Visibility</Typography>
            <VisibilityIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box position="relative" display="inline-flex" mb={2}>
            <CircularProgress
              variant="determinate"
              value={averageVisibility}
              size={90}
              thickness={4}
              sx={{ color: 'white' }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="div" color="white" sx={{ fontWeight: 700 }}>
                {averageVisibility.toFixed(0)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Answers Mentioned: {metrics?.totalMentions || 0}
          </Typography>
        </Paper>
      </Grid>

      {/* Citations */}
      <Grid item xs={12} md={3}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            background: 'white',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Total Pages Cited</Typography>
            <LinkIcon color="primary" sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            {totalPagesCited}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TrendingUpIcon color="success" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Citations tracked
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Prompts Tracked */}
      <Grid item xs={12} md={3}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            background: 'white',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Prompts Tracked</Typography>
            <AssessmentIcon color="primary" sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            {metrics?.totalPrompts || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Across {metrics?.modelsUsed?.length || 0} AI models
          </Typography>
        </Paper>
      </Grid>

      {/* Brands Tracked */}
      <Grid item xs={12} md={3}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            background: 'white',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Brands Tracked</Typography>
            <AssessmentIcon color="primary" sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            {metrics?.brandsTracked || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In this category
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MetricsCard

