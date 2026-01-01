import React from 'react'
import { Grid, Box } from '@mui/material'
import MetricsCard from './MetricsCard'
import Leaderboard from './Leaderboard'
import PromptList from './PromptList'
import TopCitedPages from './TopCitedPages'
import VisibilityTrends from './VisibilityTrends'

function Dashboard({ data, tabValue }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12}>
          <MetricsCard metrics={data.metrics} brandMetrics={data.brandMetrics} />
        </Grid>

        {/* Visibility Trends Chart */}
        <Grid item xs={12}>
          <VisibilityTrends data={data} />
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
  )
}

export default Dashboard

