import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { generateAIResponse } from '../services/aiService';

const AITest: React.FC = () => {
  const [testMessage, setTestMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    if (!testMessage.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const aiResponse = await generateAIResponse(testMessage);
      setResponse(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        AI Service Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Test the AI service by sending a message. Try asking about:
        </Typography>
        <ul>
          <li>Plant diseases</li>
          <li>Weather conditions</li>
          <li>Soil management</li>
          <li>Fertilization</li>
        </ul>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Test Message"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          placeholder="Enter your test message..."
          disabled={isLoading}
        />
        <Button
          variant="contained"
          onClick={handleTest}
          disabled={isLoading || !testMessage.trim()}
        >
          Test
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            AI Response:
          </Typography>
          <Typography variant="body1">
            {response}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AITest; 