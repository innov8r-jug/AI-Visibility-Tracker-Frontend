import React from 'react'
import {
  Paper,
  Typography,
  Box,
} from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function VisibilityTrends({ data }) {
  // Generate sample trend data (in a real app, this would come from historical data)
  const generateTrendData = () => {
    if (!data?.brandMetrics) return []
    
    const brands = data.brandMetrics.map((bm) => bm.brandName)
    const dates = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    
    return dates.map((date) => {
      const obj = { date }
      brands.forEach((brand) => {
        const brandMetric = data.brandMetrics.find((bm) => bm.brandName === brand)
        obj[brand] = brandMetric?.visibilityScore || 0
      })
      return obj
    })
  }

  const trendData = generateTrendData()
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b']

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Visibility Trends Over Time
        </Typography>
      </Box>

      {trendData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data?.brandMetrics?.map((brand, index) => (
              <Line
                key={brand.brandId}
                type="monotone"
                dataKey={brand.brandName}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height={300}>
          <Typography color="text.secondary">No trend data available</Typography>
        </Box>
      )}
    </Paper>
  )
}

export default VisibilityTrends

