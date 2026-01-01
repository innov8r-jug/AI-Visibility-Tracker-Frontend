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

  const displayLeaderboard = tabValue === 1 && leaderboardByModel
    ? (leaderboardByModel[models[modelTab]] || [])
    : leaderboard || []

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        AI Visibility Leaderboard
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
                <TableRow key={entry.brandId} hover>
                  <TableCell>
                    {index === 0 ? (
                      <TrophyIcon color="warning" />
                    ) : (
                      <Typography variant="body2">#{index + 1}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {entry.brandName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${entry.visibilityScore?.toFixed(1) || 0}%`}
                      color="primary"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {entry.citationShare?.toFixed(1) || 0}%
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{entry.totalMentions || 0}</Typography>
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

