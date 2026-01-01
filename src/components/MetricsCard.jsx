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

  const totalPagesCited = metrics?.totalMentions || 0
  const averageVisibility = calculateAverageVisibility()

  return (
    <Grid container spacing={3}>
      {/* Brand Presence */}
      <Grid item xs={12} md={3}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Visibility</Typography>
            <VisibilityIcon />
          </Box>
          <Box position="relative" display="inline-flex" mb={2}>
            <CircularProgress
              variant="determinate"
              value={averageVisibility}
              size={80}
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
              <Typography variant="h6" component="div" color="white">
                {averageVisibility.toFixed(0)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">Answers Mentioned: {metrics?.totalMentions || 0}</Typography>
        </Paper>
      </Grid>

      {/* Citations */}
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Total Pages Cited</Typography>
            <LinkIcon color="primary" />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
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
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Prompts Tracked</Typography>
            <AssessmentIcon color="primary" />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
            {metrics?.totalPrompts || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Across {metrics?.modelsUsed?.length || 0} AI models
          </Typography>
        </Paper>
      </Grid>

      {/* Brands Tracked */}
      <Grid item xs={12} md={3}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Brands Tracked</Typography>
            <AssessmentIcon color="primary" />
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
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

