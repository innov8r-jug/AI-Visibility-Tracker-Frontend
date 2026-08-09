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

function TopCitedPages({ topCitedPages = [] }) {
  const sortedPages = [...topCitedPages]
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
                sx={{ minWidth: 0 }}
                primary={
                  <Box display="flex" alignItems="center" gap={1} mb={0.5} sx={{ minWidth: 0 }}>
                    <Link
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={page.url}
                      sx={{ textDecoration: 'none', color: 'primary.main', minWidth: 0, overflow: 'hidden' }}
                    >
                      <Typography
                        variant="body1"
                        noWrap
                        sx={{ fontWeight: 'medium', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {page.title || page.url}
                      </Typography>
                    </Link>
                    <OpenInNewIcon fontSize="small" color="action" sx={{ flexShrink: 0 }} />
                  </Box>
                }
                secondary={
                  <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
                    <Chip
                      label={`${page.citationCount || 0} citations`}
                      size="small"
                      color="primary"
                      sx={{ flexShrink: 0 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      title={page.url}
                      sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
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
