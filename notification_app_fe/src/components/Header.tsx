import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Log } from '../../../logging_middleware/logger';
import { STACK_FRONTEND } from '../utils/constants';

export const Header: React.FC = () => {
  useEffect(() => {
    Log(STACK_FRONTEND, 'debug', 'component', 'Header component rendered (mounted)').catch((err) =>
      console.error('[Header Component Logger Fail]', err)
    );
  }, []);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <NotificationsActiveIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            Campus Priority Inbox
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="body2"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'text.secondary',
              fontWeight: 500,
              bgcolor: 'rgba(79, 70, 229, 0.08)',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
            }}
          >
            Live Monitor
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
