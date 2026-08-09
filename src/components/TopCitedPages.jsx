import React, { useState } from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Link,
  Button,
} from '@mui/material'
import {
  Link as LinkIcon,
  OpenInNew as OpenInNewIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material'

const DEFAULT_VISIBLE_COUNT = 5

function TopCitedPages({ topCitedPages = [] }) {
  const [expanded, setExpanded] = useState(false)

  // Sorted (not truncated) - every citation is shown, never silently hidden. Only the
  // "top" ranking comes from sort order; a collapse/expand toggle keeps the default view
  // compact without dropping any real data the way a hard slice cap used to.
  const sortedPages = [...topCitedPages].sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
  const hiddenCount = sortedPages.length - DEFAULT_VISIBLE_COUNT
  const visiblePages = expanded ? sortedPages : sortedPages.slice(0, DEFAULT_VISIBLE_COUNT)

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
        {sortedPages.length > 0 && (
          <Chip label={sortedPages.length} size="small" sx={{ fontWeight: 600 }} />
        )}
      </Box>

      <List>
        {visiblePages.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={<Typography color="text.secondary">No citations available</Typography>}
            />
          </ListItem>
        ) : (
          visiblePages.map((page, index) => (
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
                    {index === 0 && (
                      <Chip label="Top" size="small" color="secondary" sx={{ fontWeight: 700, flexShrink: 0 }} />
                    )}
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
                    {/* Most URLs are only ever cited once across models - a "1 citations"
                        badge on nearly every row is just noise. Only show it when it's
                        actually a signal: the same source referenced multiple times. */}
                    {page.citationCount > 1 && (
                      <Chip
                        label={`${page.citationCount} citations`}
                        size="small"
                        color="primary"
                        sx={{ flexShrink: 0 }}
                      />
                    )}
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

      {hiddenCount > 0 && (
        <Button
          fullWidth
          onClick={() => setExpanded((prev) => !prev)}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ mt: 1, textTransform: 'none', fontWeight: 600 }}
        >
          {expanded ? 'Show less' : `Show all ${sortedPages.length} citations`}
        </Button>
      )}
    </Paper>
  )
}

export default TopCitedPages
