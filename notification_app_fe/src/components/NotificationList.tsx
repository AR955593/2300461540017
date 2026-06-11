import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Notification } from '../types/notification';
import { NotificationCard } from './NotificationCard';
import { Log } from '../../../logging_middleware/logger';
import { STACK_FRONTEND } from '../utils/constants';

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onToggleRead?: (id: string | number) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  error,
  onRetry,
  onToggleRead,
}) => {
  useEffect(() => {
    Log(STACK_FRONTEND, 'debug', 'component', 'NotificationList component rendered (mounted)').catch((err) =>
      console.error('[NotificationList Component Logger Fail]', err)
    );
  }, []);

  // 1. Loading State (Skeleton Loaders)
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} key={item}>
            <Box
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 3,
                border: '1px solid #E5E7EB',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="rounded" width={100} height={24} />
                <Skeleton variant="circular" width={36} height={36} />
              </Box>
              <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} width="80%" />
              <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 2 }} width="50%" />
              <Skeleton variant="rectangular" height={1} sx={{ mt: 2 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8,
          px: 3,
          bgcolor: '#FEF2F2',
          borderRadius: 3,
          border: '1px solid #FEE2E2',
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 56, mb: 2 }} />
        <Typography variant="h6" color="error" fontWeight={700} gutterBottom>
          Failed to load inbox
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
          {error || 'An unexpected error occurred while communicating with the campus notification server.'}
        </Typography>
        <Button variant="contained" color="error" startIcon={<RefreshIcon />} onClick={onRetry} sx={{ px: 3 }}>
          Retry Loading
        </Button>
      </Box>
    );
  }

  // 3. Empty State
  if (notifications.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 10,
          px: 3,
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px dashed #D1D5DB',
        }}
      >
        <InboxOutlinedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.6 }} />
        <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary' }} gutterBottom>
          Your priority inbox is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 350, mb: 3 }}>
          No campus announcements or notification alerts match your priority filters at this time.
        </Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRetry} sx={{ px: 3 }}>
          Refresh Inbox
        </Button>
      </Box>
    );
  }

  // 4. Content State
  return (
    <Grid container spacing={3}>
      {notifications.map((notification) => (
        <Grid item xs={12} key={notification.id}>
          <NotificationCard notification={notification} onToggleRead={onToggleRead} />
        </Grid>
      ))}
    </Grid>
  );
};
