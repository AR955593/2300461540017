import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Notification } from '../types/notification';
import { TopNSelector } from '../components/TopNSelector';
import { NotificationList } from '../components/NotificationList';
import { Log } from '../../../logging_middleware/logger';
import { STACK_FRONTEND } from '../utils/constants';

interface DashboardProps {
  notifications: Notification[];
  topN: number;
  onTopNChange: (newValue: number) => void;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onToggleRead: (id: string | number) => void;
  rawNotifications: Notification[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  notifications,
  topN,
  onTopNChange,
  loading,
  error,
  onRetry,
  onToggleRead,
  rawNotifications,
}) => {
  // Page load logging
  useEffect(() => {
    Log(STACK_FRONTEND, 'info', 'page', 'Dashboard page loaded').catch((err) =>
      console.error('[Dashboard Page Logger Fail]', err)
    );
  }, []);

  // Calculate quick stats
  const totalCount = rawNotifications.length;
  const unreadCount = rawNotifications.filter((n) => !(n.read ?? n.isRead)).length;
  const readCount = totalCount - unreadCount;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Banner */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            mb: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Priority Inbox
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your smart campus notifications center. Important announcements are sorted automatically.
        </Typography>
      </Box>

      {/* Stats Summary Panel */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <NotificationsIcon color="primary" sx={{ mb: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              {loading ? '-' : totalCount}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              TOTAL
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <MarkEmailUnreadIcon color="error" sx={{ mb: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              {loading ? '-' : unreadCount}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              UNREAD
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <DraftsIcon color="success" sx={{ mb: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              {loading ? '-' : readCount}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              READ
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Top N Selector */}
      <TopNSelector value={topN} onChange={onTopNChange} />

      {/* Notification List */}
      <Box sx={{ mt: 2 }}>
        <NotificationList
          notifications={notifications}
          loading={loading}
          error={error}
          onRetry={onRetry}
          onToggleRead={onToggleRead}
        />
      </Box>
    </Container>
  );
};
