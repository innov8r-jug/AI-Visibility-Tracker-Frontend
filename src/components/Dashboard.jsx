import React from 'react'
import { Grid, Box, Fade } from '@mui/material'
import MetricsCard from './MetricsCard'
import Leaderboard from './Leaderboard'
import PromptList from './PromptList'
import TopCitedPages from './TopCitedPages'
import ModelInsights from './ModelInsights'

function Dashboard({ data, tabValue }) {
  return (
    <Fade in={true} timeout={300}>
      <Box>
      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12}>
          <MetricsCard metrics={data.metrics} brandMetrics={data.brandMetrics} />
        </Grid>

        {/* Model Insights - Replaces Visibility Trends */}
        <Grid item xs={12}>
          <ModelInsights data={data} tabValue={tabValue} />
        </Grid>

        {/* Leaderboard */}
        <Grid item xs={12} md={6}>
          <Leaderboard
            leaderboard={data.leaderboard}
            leaderboardByModel={data.leaderboardByModel}
            tabValue={tabValue}
          />
        </Grid>

        {/* Top Cited Pages */}
        <Grid item xs={12} md={6}>
          <TopCitedPages
            topCitedPages={data.topCitedPages}
            topCitedPagesByModel={data.topCitedPagesByModel}
            tabValue={tabValue}
          />
        </Grid>

        {/* Prompt List */}
        <Grid item xs={12}>
          <PromptList prompts={data.prompts} />
        </Grid>
      </Grid>
      </Box>
    </Fade>
  )
}

export default Dashboard

