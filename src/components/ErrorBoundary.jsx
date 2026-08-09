import React from 'react'
import { Container, Typography, Button, Box } from '@mui/material'

// React error boundaries must be class components (no hooks equivalent as of React 18).
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error('Unhandled UI error:', error, info)
    }

    handleReset = () => {
        this.setState({ hasError: false })
        window.location.href = '/'
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                            Something went wrong displaying this data.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Please try running a new search.
                        </Typography>
                        <Button variant="contained" onClick={this.handleReset}>
                            Back to Search
                        </Button>
                    </Box>
                </Container>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
