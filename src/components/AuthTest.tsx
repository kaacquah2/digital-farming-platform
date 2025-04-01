import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const AuthTest: React.FC = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<{
    health: any;
    diseases: any;
    error: string | null;
  }>({
    health: null,
    diseases: null,
    error: null
  });

  const testHealthEndpoint = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setTestResults(prev => ({ ...prev, health: data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, error: 'Failed to test health endpoint' }));
    }
  };

  const testDiseasesEndpoint = async () => {
    if (!user) {
      setTestResults(prev => ({ ...prev, error: 'User not authenticated' }));
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5000/api/diseases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTestResults(prev => ({ ...prev, diseases: data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, error: 'Failed to test diseases endpoint' }));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Authentication Test
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current User Status
        </Typography>
        <Typography>
          {user ? `Logged in as: ${user.email}` : 'Not logged in'}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={testHealthEndpoint}
          disabled={!user}
        >
          Test Health Endpoint
        </Button>
        <Button
          variant="contained"
          onClick={testDiseasesEndpoint}
          disabled={!user}
        >
          Test Diseases Endpoint
        </Button>
      </Box>

      {testResults.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {testResults.error}
        </Alert>
      )}

      {testResults.health && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Health Endpoint Result
          </Typography>
          <pre>
            {JSON.stringify(testResults.health, null, 2)}
          </pre>
        </Paper>
      )}

      {testResults.diseases && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Diseases Endpoint Result
          </Typography>
          <pre>
            {JSON.stringify(testResults.diseases, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default AuthTest; 