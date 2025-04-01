import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Chat,
  QuestionAnswer,
  SupportAgent,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HelpAndSupport: React.FC = () => {
  const navigate = useNavigate();

  const handleLiveChat = () => {
    navigate('/live-chat');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>

      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary="support@digitalfarming.com"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary="+1 (555) 123-4567"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText 
                  primary="Address" 
                  secondary="123 Farming Street, Agriculture City, AC 12345"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Support Options */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Support Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={handleLiveChat}
                >
                  <Chat sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">Live Chat</Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Chat with our AI assistant for instant help
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <QuestionAnswer sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">FAQ</Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Find answers to common questions
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Support Hours */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Support Hours
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SupportAgent />
                </ListItemIcon>
                <ListItemText 
                  primary="Monday - Friday" 
                  secondary="9:00 AM - 6:00 PM EST"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SupportAgent />
                </ListItemIcon>
                <ListItemText 
                  primary="Saturday" 
                  secondary="10:00 AM - 4:00 PM EST"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SupportAgent />
                </ListItemIcon>
                <ListItemText 
                  primary="Sunday" 
                  secondary="Closed"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HelpAndSupport; 