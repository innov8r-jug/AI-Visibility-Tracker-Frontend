import React from 'react'
import { Box, Typography } from '@mui/material'

function WritesonicLogo({ size = 40, showText = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: size * 0.5,
        }}
      >
        W
      </Box>
      {showText && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Writesonic
        </Typography>
      )}
    </Box>
  )
}

export default WritesonicLogo

