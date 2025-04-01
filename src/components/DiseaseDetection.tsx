import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Typography, Alert, Grid, Paper } from '@mui/material';
import { CloudUpload, Image as ImageIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface DiseaseRecommendations {
  immediate_actions: string[];
  preventive_measures: string[];
  monitoring_frequency: string;
  risk_level: string;
}

interface PredictionResult {
  disease: string;
  confidence: number;
  recommendations: DiseaseRecommendations;
}

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
        setResult(null);
      } else {
        setError('Please upload an image file');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Plant Disease Detection
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              border: '2px dashed #ccc',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
            {previewUrl ? (
              <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Analyze Image'}
                </Button>
              </Box>
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Drag and drop an image here
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or click to select a file
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Supported formats: PNG, JPG, JPEG (max 5MB)
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Detection Results
                </Typography>
                
                <Typography variant="h6" color="primary" gutterBottom>
                  {result.disease.replace(/_/g, ' ').toUpperCase()}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Confidence: {(result.confidence * 100).toFixed(2)}%
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Immediate Actions:
                </Typography>
                <ul>
                  {result.recommendations.immediate_actions.map((action, index) => (
                    <li key={index}>
                      <Typography variant="body2">{action}</Typography>
                    </li>
                  ))}
                </ul>

                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Preventive Measures:
                </Typography>
                <ul>
                  {result.recommendations.preventive_measures.map((measure, index) => (
                    <li key={index}>
                      <Typography variant="body2">{measure}</Typography>
                    </li>
                  ))}
                </ul>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Typography variant="body2">
                    <strong>Monitoring Frequency:</strong> {result.recommendations.monitoring_frequency}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Risk Level:</strong> {result.recommendations.risk_level}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiseaseDetection; 