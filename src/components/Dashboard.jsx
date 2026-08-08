import React from 'react'
import { Grid, Box, Fade, Typography, Paper } from '@mui/material'
import MetricsCard from './MetricsCard'
import Leaderboard from './Leaderboard'
import WritesonicLogo from './WritesonicLogo'

function Dashboard({ data }) {
    // If no data has been fetched yet, show empty state
    if (!data) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
                <WritesonicLogo size={60} showText={true} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
                    Enter a prompt above to run real-time GEO analysis.
                </Typography>
            </Box>
        )
    }

    return (
        <Fade in={true} timeout={300}>
            <Box>
                <Grid container spacing={3}>
                    {/* Real-time Query Info */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e0e7ff', background: '#f8fafc' }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Analyzed Prompt</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, fontStyle: 'italic', color: '#1F2937' }}>
                                "{data.prompt}"
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Execution Metrics */}
                    <Grid item xs={12}>
                        <MetricsCard data={data} />
                    </Grid>

                    {/* Share of Model Leaderboard */}
                    <Grid item xs={12}>
                        <Leaderboard analysisData={data.analysisData} />
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    )
}

export default Dashboard