import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Notification } from './types/notification';
import { fetchNotifications } from './services/notificationApi';
import { getTopNotifications } from './utils/priorityCalculator';
import { Log } from '../../logging_middleware/logger';
import { STACK_FRONTEND } from './utils/constants';

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topN, setTopN] = useState<number>(10);

  // Load notifications from API
  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    Log(STACK_FRONTEND, 'info', 'state', 'Loading state set to true: starting fetch').catch((err) =>
      console.error('[App State Logger Fail]', err)
    );

    try {
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
      Log(STACK_FRONTEND, 'info', 'state', `Fetch complete. Loaded ${data.length} notifications into state.`).catch(
        (err) => console.error('[App State Logger Fail]', err)
      );
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch campus notifications.');
      setLoading(false);
      Log(STACK_FRONTEND, 'error', 'state', `Fetch failed. State error updated: ${err?.message}`).catch((err) =>
        console.error('[App State Logger Fail]', err)
      );
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Handle toggling read/unread status (state update)
  const handleToggleRead = useCallback((id: string | number) => {
    setNotifications((prevNotifications) => {
      const updated = prevNotifications.map((n) => {
        if (n.id === id) {
          const currentRead = n.read ?? n.isRead ?? false;
          const newRead = !currentRead;
          return {
            ...n,
            read: newRead,
            isRead: newRead,
          };
        }
        return n;
      });

      Log(STACK_FRONTEND, 'info', 'state', `Notification ID ${id} read status toggled.`).catch((err) =>
        console.error('[App Toggle State Logger Fail]', err)
      );

      return updated;
    });
  }, []);

  // Handle changing TopN selector (state update)
  const handleTopNChange = useCallback((n: number) => {
    setTopN(n);
  }, []);

  // Memoized top N sorted priority notifications to avoid recalculating on random rerenders
  const topNotifications = useMemo(() => {
    return getTopNotifications(notifications, topN);
  }, [notifications, topN]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Dashboard
            notifications={topNotifications}
            rawNotifications={notifications}
            topN={topN}
            onTopNChange={handleTopNChange}
            loading={loading}
            error={error}
            onRetry={loadNotifications}
            onToggleRead={handleToggleRead}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
