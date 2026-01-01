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
  const displayPages = tabValue === 1 && topCitedPagesByModel
    ? Object.values(topCitedPagesByModel).flat()
    : topCitedPages || []

  const sortedPages = [...displayPages]
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, 10)

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <LinkIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Top Cited Pages
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
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                mb: 1,
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

