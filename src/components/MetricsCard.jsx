import React from 'react'
import { Paper, Grid, Typography, Box, CircularProgress } from '@mui/material'
import {
    Speed as SpeedIcon,
    CheckCircle as CheckCircleIcon,
    Memory as MemoryIcon,
    DataUsage as DataUsageIcon,
} from '@mui/icons-material'

function MetricsCard({ data }) {
    if (!data) return null;

    const { totalModelsQueried = 0, successfulResponses = 0, executionTimeMs = 0, brands = [] } = data;
    const brandsFound = brands.length;
    const successRate = totalModelsQueried > 0 ? (successfulResponses / totalModelsQueried) * 100 : 0;

    return (
        <Grid container spacing={3}>
            {/* Execution Speed */}
            <Grid item xs={12} md={3}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #3b00ff 0%, #d536d6 100%)',
                        color: 'white',
                        boxShadow: '0 8px 16px rgba(59, 0, 255, 0.2)',
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Response Time</Typography>
                        <SpeedIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {(executionTimeMs / 1000).toFixed(2)}s
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                        Parallel Scatter-Gather Engine
                    </Typography>
                </Paper>
            </Grid>

            {/* Models Queried */}
            <Grid item xs={12} md={3}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>LLMs Queried</Typography>
                        <MemoryIcon color="primary" sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                        {totalModelsQueried}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Concurrent API Calls
                    </Typography>
                </Paper>
            </Grid>

            {/* Success Rate */}
            <Grid item xs={12} md={3}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Success Rate</Typography>
                        <CheckCircleIcon color="success" sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                        {successRate.toFixed(0)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {successfulResponses} of {totalModelsQueried} models responded
                    </Typography>
                </Paper>
            </Grid>

            {/* Brands Discovered */}
            <Grid item xs={12} md={3}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e5e7eb' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Brands Found</Typography>
                        <DataUsageIcon color="secondary" sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                        {brandsFound}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Unique entities extracted
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default MetricsCard