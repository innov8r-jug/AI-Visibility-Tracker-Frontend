import React from 'react'
import { Box, Typography } from '@mui/material'

function WritesonicLogo({ size = 40, showText = false }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Recreating the layered logo from image_412a18.png */}
            <Box sx={{ position: 'relative', width: size, height: size }}>
                {/* Cyan Background Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '85%',
                        height: '85%',
                        backgroundColor: '#00d2ff',
                        borderRadius: '25%',
                        transform: 'skewX(-10deg)',
                    }}
                />
                {/* Pink/Magenta Background Layer */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '85%',
                        height: '85%',
                        background: 'linear-gradient(135deg, #d536d6 0%, #ff89d6 100%)',
                        borderRadius: '25%',
                        transform: 'skewX(-10deg)',
                    }}
                />
                {/* Purple Center Layer with 'WS' */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '5%',
                        left: '10%',
                        width: '85%',
                        height: '85%',
                        backgroundColor: '#3b00ff',
                        borderRadius: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'skewX(-10deg)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 900,
                            fontSize: size * 0.45,
                            transform: 'skewX(10deg)', // Un-skew the text
                            letterSpacing: '-1px',
                            ml: 0.5
                        }}
                    >
                        WS
                    </Typography>
                </Box>
            </Box>

            {showText && (
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        fontSize: '1.4rem',
                        color: '#1F2937',
                        letterSpacing: '-0.5px'
                    }}
                >
                    Writesonic
                </Typography>
            )}
        </Box>
    )
}

export default WritesonicLogo