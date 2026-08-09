import React from 'react'
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'
import { EmojiEvents as TrophyIcon } from '@mui/icons-material'

function Leaderboard({ brands = [] }) {
  const leaderboardData = [...brands]
    .map((b) => ({ name: b.name, som: b.sharePercent ?? 0, mentions: b.mentionCount ?? 0 }))
    .sort((a, b) => b.som - a.som)

  return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e5e7eb', background: 'white', height: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1F2937', mb: 3 }}>
          Share of Model (SoM) Leaderboard
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Share of Model</TableCell>
                <TableCell>Mentions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="text.secondary">No brands detected in LLM responses.</Typography>
                    </TableCell>
                  </TableRow>
              ) : (
                  leaderboardData.map((entry, index) => (
                      <TableRow key={entry.name} hover>
                        <TableCell>
                          {index === 0 ? <TrophyIcon sx={{ color: '#F59E0B', fontSize: 28 }} /> : <Typography variant="body2" sx={{ fontWeight: 600, color: '#6B7280' }}>#{index + 1}</Typography>}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1F2937' }}>
                            {entry.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                              label={`${entry.som.toFixed(1)}%`}
                              size="small"
                              sx={{ fontWeight: 600, backgroundColor: index === 0 ? '#3b00ff' : '#e0e7ff', color: index === 0 ? 'white' : '#3b00ff' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {entry.mentions}
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
