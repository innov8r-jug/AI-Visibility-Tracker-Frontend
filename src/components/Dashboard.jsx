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
          {/* Metrics Cards - Always visible */}
          <Grid item xs={12}>
            <MetricsCard metrics={data.metrics} brandMetrics={data.brandMetrics} />
          </Grid>

          {/* General Tab: Show Model Insights only */}
          {tabValue === 0 && (
            <Grid item xs={12}>
              <ModelInsights data={data} tabValue={tabValue} />
            </Grid>
          )}

          {/* Platforms Tab: Show Leaderboard and Top Cited Pages with model filtering */}
          {tabValue === 1 && (
            <>
              <Grid item xs={12}>
                <ModelInsights data={data} tabValue={tabValue} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Leaderboard
                  leaderboard={data.leaderboard}
                  leaderboardByModel={data.leaderboardByModel}
                  tabValue={tabValue}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TopCitedPages
                  topCitedPages={data.topCitedPages}
                  topCitedPagesByModel={data.topCitedPagesByModel}
                  tabValue={tabValue}
                />
              </Grid>
            </>
          )}

          {/* Competitors Tab: Show all competitor-focused components */}
          {tabValue === 2 && (
            <>
              <Grid item xs={12}>
                <ModelInsights data={data} tabValue={tabValue} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Leaderboard
                  leaderboard={data.leaderboard}
                  leaderboardByModel={data.leaderboardByModel}
                  tabValue={tabValue}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TopCitedPages
                  topCitedPages={data.topCitedPages}
                  topCitedPagesByModel={data.topCitedPagesByModel}
                  tabValue={tabValue}
                />
              </Grid>
              <Grid item xs={12}>
                <PromptList prompts={data.prompts} />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Fade>
  )
}

export default Dashboard

