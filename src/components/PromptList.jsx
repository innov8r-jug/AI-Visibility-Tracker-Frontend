import React, { useState } from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material'
import { Search as SearchIcon, CheckCircle, Cancel } from '@mui/icons-material'

function PromptList({ prompts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterModel, setFilterModel] = useState('all')

  const filteredPrompts = prompts?.filter((prompt) => {
    const matchesSearch = prompt.queryText?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModel = filterModel === 'all' || prompt.aiModel === filterModel
    return matchesSearch && matchesModel
  }) || []

  const models = [...new Set(prompts?.map((p) => p.aiModel) || [])]

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
          Prompts Tracked
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 200 }}
          />
          <Chip
            label={filterModel === 'all' ? 'All Models' : filterModel}
            onClick={() => setFilterModel('all')}
            variant={filterModel === 'all' ? 'filled' : 'outlined'}
            size="small"
          />
        </Box>
      </Box>

      <List>
        {filteredPrompts.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={<Typography color="text.secondary">No prompts found</Typography>}
            />
          </ListItem>
        ) : (
          filteredPrompts.map((prompt) => (
            <ListItem
              key={prompt.id}
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                mb: 1.5,
                background: prompt.mentionedBrands?.length > 0 
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'white',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderColor: prompt.mentionedBrands?.length > 0 ? '#10b981' : '#7C3AED',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {prompt.queryText}
                    </Typography>
                    <Chip label={prompt.aiModel} size="small" color="primary" />
                    {prompt.mentionedBrands?.length > 0 ? (
                      <CheckCircle color="success" fontSize="small" />
                    ) : (
                      <Cancel color="error" fontSize="small" />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {prompt.mentionedBrands?.length > 0
                        ? `Mentioned: ${prompt.mentionedBrands.join(', ')}`
                        : 'No brands mentioned'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(prompt.timestamp).toLocaleString()}
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

export default PromptList

