import React from 'react'
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Tabs,
  Tab,
} from '@mui/material'
import { EmojiEvents as TrophyIcon } from '@mui/icons-material'

function Leaderboard({ leaderboard, leaderboardByModel, tabValue }) {
  const [modelTab, setModelTab] = React.useState(0)
  const models = leaderboardByModel ? Object.keys(leaderboardByModel) : []

  // Determine which leaderboard data to display based on tab
  let displayLeaderboard = []
  let title = 'AI Visibility Leaderboard'
  
  if (tabValue === 0) {
    // General: Show aggregated leaderboard across all models
    displayLeaderboard = leaderboard || []
    title = 'Overall Visibility Leaderboard'
  } else if (tabValue === 1) {
    // Platforms: Show model-specific leaderboard
    displayLeaderboard = leaderboardByModel && models.length > 0
      ? (leaderboardByModel[models[modelTab]] || [])
      : []
    title = `${models[modelTab] || 'Platform'} Visibility Leaderboard`
  } else if (tabValue === 2) {
    // Competitors: Show top competitors (same as general but with different context)
    displayLeaderboard = leaderboard || []
    title = 'Competitor Analysis'
  } else {
    displayLeaderboard = leaderboard || []
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        background: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1F2937' }}>
        {title}
      </Typography>

      {tabValue === 1 && models.length > 0 && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={modelTab} onChange={(e, v) => setModelTab(v)}>
            {models.map((model) => (
              <Tab key={model} label={model} />
            ))}
          </Tabs>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>Citation Share</TableCell>
              <TableCell>Mentions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayLeaderboard.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              displayLeaderboard.map((entry, index) => (
                <TableRow 
                  key={entry.brandId} 
                  hover
                  sx={{
                    '&:hover': {
                      background: '#f9fafb',
                    },
                    '&:nth-of-type(odd)': {
                      background: index === 0 ? '#fef3c7' : '#f9fafb',
                    },
                  }}
                >
                  <TableCell>
                    {index === 0 ? (
                      <TrophyIcon color="warning" sx={{ fontSize: 28 }} />
                    ) : (
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>
                        #{index + 1}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1F2937' }}>
                      {entry.brandName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${entry.visibilityScore?.toFixed(1) || 0}%`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {entry.citationShare?.toFixed(1) || 0}%
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {entry.totalMentions || 0}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Leaderboard

