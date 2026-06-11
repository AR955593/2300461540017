import { createTheme } from '@mui/material/styles';
import { Log } from '../../logging_middleware/logger';
import { STACK_FRONTEND } from './utils/constants';

// Initializing typography and style logs
Log(STACK_FRONTEND, 'info', 'style', 'MUI Theme and stylesheet configurations initialized').catch((err) =>
  console.error('[Theme Logger Fail]', err)
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Sleek Indigo
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0D9488', // Energetic Teal
      light: '#2DD4BF',
      dark: '#115E59',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FAFB', // Light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Dark gray
      secondary: '#4B5563', // Slate gray
    },
    info: {
      main: '#3B82F6', // Blue for Event
    },
    success: {
      main: '#10B981', // Green for Placement
    },
    warning: {
      main: '#F59E0B', // Amber for Result
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    subtitle2: {
      fontWeight: 600,
    },
    body1: {
      color: '#374151',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          border: '1px solid #E5E7EB',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
          borderBottom: '1px solid #E5E7EB',
        },
      },
    },
  },
});

export default theme;
