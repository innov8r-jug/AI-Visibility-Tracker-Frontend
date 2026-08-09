import React from 'react'
import { Grid, Box, Fade, Paper, Typography } from '@mui/material'
import MetricsCard from './MetricsCard'
import Leaderboard from './Leaderboard'
import TopCitedPages from './TopCitedPages'
import ModelInsights from './ModelInsights'
import WritesonicLogo from './WritesonicLogo'
import { normalizeDashboardData } from '../utils/dashboardShape'

function Dashboard({ data }) {
    if (!data) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh" textAlign="center">
                <WritesonicLogo size={64} showText={true} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                    No data available. Run a new search above.
                </Typography>
            </Box>
        )
    }

    const normalized = normalizeDashboardData(data)

    return (
        <Fade in={true} timeout={300}>
            <Box>
                <Grid container spacing={3}>
                    {/* Active Prompt Banner */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e2e8f0', background: '#ffffff' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                                Evaluated Query
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', fontStyle: 'italic' }}>
                                "{normalized.prompt || 'Custom Prompt'}"
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Metrics Cards */}
                    <Grid item xs={12}>
                        <MetricsCard data={normalized} />
                    </Grid>

                    {/* Leaderboard */}
                    <Grid item xs={12} md={6}>
                        <Leaderboard brands={normalized.brands} />
                    </Grid>

                    {/* Top Cited Pages */}
                    <Grid item xs={12} md={6}>
                        <TopCitedPages topCitedPages={normalized.topCitedPages} />
                    </Grid>

                    {/* Model Insights */}
                    <Grid item xs={12}>
                        <ModelInsights data={normalized} />
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    )
}

export default Dashboard
