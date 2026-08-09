import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
} from '@mui/material'
import {
  Psychology as PsychologyIcon,
  CompareArrows as CompareIcon,
  Insights as InsightsIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material'

function ModelInsights({ data }) {
  const { brands = [], modelComparison = {}, topCitedPages = [] } = data || {}
  const brandNames = brands.map((b) => b.name)
  const modelNames = Object.keys(modelComparison)

  // modelComparison maps model -> list of brand names that model mentioned
  const topBrandsByModel = {}
  modelNames.forEach((model) => {
    topBrandsByModel[model] = (modelComparison[model] || []).slice(0, 3)
  })

  const modelStats = modelNames
    .map((model) => {
      const mentionedBrands = modelComparison[model] || []
      const brandCount = new Set(mentionedBrands).size
      return {
        model,
        totalMentions: mentionedBrands.length,
        brandCount,
      }
    })
    .sort((a, b) => b.totalMentions - a.totalMentions)

  const totalBrands = brands.length
  const totalMentions = brands.reduce((sum, b) => sum + (b.mentionCount || 0), 0)
  // Deliberately NOT summed from brands[].citationCount: a citation isn't reliably
  // attributable to one specific brand (the LLM doesn't link them), so per-brand
  // citationCount is only an even split approximation. The true total is the actual
  // distinct citations extracted, which is what's listed in Top Cited Pages below -
  // this keeps the headline number consistent with what's visibly shown.
  const totalCitations = topCitedPages.reduce((sum, p) => sum + (p.citationCount || 0), 0)

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        border: '1px solid #e0e7ff',
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <InsightsIcon fontSize="large" />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
            AI Model Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analysis across {modelNames.length} AI model{modelNames.length === 1 ? '' : 's'}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Model Performance Summary */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e5e7eb',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <BarChartIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Model Performance
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {modelStats.length > 0 ? (
                <Box>
                  {modelStats.map((stat, index) => (
                    <Box
                      key={stat.model}
                      sx={{
                        mb: index < modelStats.length - 1 ? 2 : 0,
                        p: 2,
                        borderRadius: 1,
                        background: index === 0 ? '#f0f9ff' : 'transparent',
                        border: index === 0 ? '1px solid #bfdbfe' : 'none',
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {stat.model}
                        </Typography>
                        <Chip
                          label={`${stat.totalMentions} mentions`}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.brandCount} brand{stat.brandCount === 1 ? '' : 's'} mentioned
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No model data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Brands by Model */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e5e7eb',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CompareIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Top Brands by Model
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {Object.keys(topBrandsByModel).length > 0 ? (
                <Box>
                  {Object.entries(topBrandsByModel).map(([model, modelBrands], index) => (
                    <Box
                      key={model}
                      sx={{
                        mb: index < Object.keys(topBrandsByModel).length - 1 ? 2.5 : 0,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: '#6B7280',
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        {model}
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {modelBrands.length > 0 ? modelBrands.map((brand, brandIndex) => (
                          <Chip
                            key={brandIndex}
                            label={brand}
                            size="small"
                            sx={{
                              background: brandIndex === 0
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : brandIndex === 1
                                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              color: 'white',
                              fontWeight: 600,
                              '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s',
                              },
                            }}
                          />
                        )) : (
                          <Typography variant="caption" color="text.secondary">No brands mentioned</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No brand data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Brands analyzed (includes discovered competitors) */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              background: 'white',
              borderRadius: 2,
              border: '1px solid #e5e7eb',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PsychologyIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Brands Analyzed
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {brandNames.length > 0 ? (
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {brandNames.map((name, idx) => (
                    <Chip
                      key={`${name}-${idx}`}
                      label={name}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No brands available yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Key Insights */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
              borderRadius: 2,
              border: '1px solid #e0e7ff',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PsychologyIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Key Insights
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 0.5 }}>
                      {totalBrands}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Brands Analyzed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#764ba2', mb: 0.5 }}>
                      {totalMentions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Mentions
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box textAlign="center">
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#be185d', mb: 0.5 }}>
                      {totalCitations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Citations Found
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ModelInsights
