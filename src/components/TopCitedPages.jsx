import React from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Link,
} from '@mui/material'
import { Link as LinkIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material'

function TopCitedPages({ topCitedPages, topCitedPagesByModel, tabValue }) {
  // Determine which pages to display based on tab
  let displayPages = []
  let title = 'Top Cited Pages'
  
  if (tabValue === 0) {
    // General: Show aggregated top cited pages
    displayPages = topCitedPages || []
    title = 'Top Cited Pages (All Platforms)'
  } else if (tabValue === 1) {
    // Platforms: Show pages from all models combined
    displayPages = topCitedPagesByModel
      ? Object.values(topCitedPagesByModel).flat()
      : []
    title = 'Top Cited Pages (By Platform)'
  } else if (tabValue === 2) {
    // Competitors: Show competitor pages (same as general but with different context)
    displayPages = topCitedPages || []
    title = 'Competitor Citation Sources'
  } else {
    displayPages = topCitedPages || []
  }

  const sortedPages = [...displayPages]
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, 10)

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
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <LinkIcon color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
          {title}
        </Typography>
      </Box>

      <List>
        {sortedPages.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={<Typography color="text.secondary">No citations available</Typography>}
            />
          </ListItem>
        ) : (
          sortedPages.map((page, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                mb: 1.5,
                background: 'white',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderColor: '#7C3AED',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Link
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none', color: 'primary.main' }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {page.title || page.url}
                      </Typography>
                    </Link>
                    <OpenInNewIcon fontSize="small" color="action" />
                  </Box>
                }
                secondary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={`${page.citationCount || 0} citations`}
                      size="small"
                      color="primary"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {page.url}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  )
}

export default TopCitedPages

