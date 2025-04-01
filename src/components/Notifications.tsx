import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Chip,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  NotificationsActive,
  NotificationsOff,
  CheckAll,
  Delete,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotifications, Notification } from '../contexts/NotificationContext';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { notifications, markAsRead, markAllAsRead, clearNotifications, preferences, updatePreferences } = useNotifications();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <NotificationsActive color="success" />;
      case 'error':
        return <NotificationsActive color="error" />;
      case 'warning':
        return <NotificationsActive color="warning" />;
      default:
        return <NotificationsActive color="info" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === 0) return true;
    return !notification.read;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderRadius: 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Box>
          <Button
            startIcon={<CheckAll />}
            onClick={markAllAsRead}
            sx={{ mr: 1 }}
          >
            Mark all as read
          </Button>
          <Button
            startIcon={<Delete />}
            onClick={clearNotifications}
            color="error"
          >
            Clear all
          </Button>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All" />
          <Tab label="Unread" />
        </Tabs>
      </Paper>

      {/* Notifications List */}
      <Paper>
        <List>
          {filteredNotifications.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No notifications" 
                secondary="You're all caught up!"
              />
            </ListItem>
          ) : (
            filteredNotifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    bgcolor: notification.read ? 'inherit' : theme.palette.action.hover,
                    '&:hover': {
                      bgcolor: theme.palette.action.selected,
                    },
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.timestamp.toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications; 