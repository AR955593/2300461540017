import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Notification } from '../types/notification';
import { Log } from '../../../logging_middleware/logger';
import { STACK_FRONTEND } from '../utils/constants';

interface NotificationCardProps {
  notification: Notification;
  onToggleRead?: (id: string | number) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onToggleRead }) => {
  const { id, title, type, date, timestamp, read, isRead, priorityScore } = notification;
  const isNotificationRead = read ?? isRead ?? false;
  const notificationDate = date || timestamp;

  useEffect(() => {
    Log(STACK_FRONTEND, 'debug', 'component', `NotificationCard rendered (mounted) for ID ${id}`).catch((err) =>
      console.error('[NotificationCard Component Logger Fail]', err)
    );
  }, [id]);

  // Determine Icon and Colors based on Type
  const getTypeConfig = (t: string) => {
    const upper = t.toUpperCase();
    switch (upper) {
      case 'PLACEMENT':
        return {
          icon: <SchoolIcon fontSize="small" />,
          color: 'success' as const,
          bgColor: '#ECFDF5',
          borderColor: '#10B981',
          label: 'Placement',
        };
      case 'RESULT':
        return {
          icon: <CampaignIcon fontSize="small" />,
          color: 'warning' as const,
          bgColor: '#FFFBEB',
          borderColor: '#F59E0B',
          label: 'Result',
        };
      case 'EVENT':
        return {
          icon: <EventIcon fontSize="small" />,
          color: 'info' as const,
          bgColor: '#EFF6FF',
          borderColor: '#3B82F6',
          label: 'Event',
        };
      default:
        return {
          icon: <InfoOutlinedIcon fontSize="small" />,
          color: 'default' as const,
          bgColor: '#F9FAFB',
          borderColor: '#9CA3AF',
          label: t || 'General',
        };
    }
  };

  const typeConfig = getTypeConfig(type);

  // Format Date
  const formatNotificationDate = (dateString?: string) => {
    if (!dateString) return 'No Date';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        bgcolor: isNotificationRead ? 'background.paper' : '#F5F3FF', // Light violet tint for unread
        borderLeft: `6px solid ${isNotificationRead ? '#D1D5DB' : '#4F46E5'}`, // Indigo accent for unread
        '&:hover': {
          borderLeftColor: typeConfig.borderColor,
        },
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          {/* Category Chip */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={typeConfig.icon}
              label={typeConfig.label}
              color={typeConfig.color}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            />
            {/* Read/Unread Tag */}
            {!isNotificationRead && (
              <Chip
                label="New"
                color="primary"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              />
            )}
          </Box>

          {/* Priority Score badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
              Priority Score
            </Typography>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#4F46E5',
                bgcolor: 'rgba(79, 70, 229, 0.12)',
                border: '1.5px solid #4F46E5',
              }}
            >
              {priorityScore !== undefined ? Math.round(priorityScore) : '-'}
            </Avatar>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: isNotificationRead ? 600 : 800,
            fontSize: '1.1rem',
            color: 'text.primary',
            mb: 1.5,
            lineHeight: 1.4,
            cursor: onToggleRead ? 'pointer' : 'default',
          }}
          onClick={() => onToggleRead && onToggleRead(id)}
        >
          {title}
        </Typography>

        {/* Footer Meta */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 1.5,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <QueryBuilderIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {formatNotificationDate(notificationDate)}
            </Typography>
          </Box>

          {onToggleRead && (
            <Button
              size="small"
              variant="text"
              onClick={() => onToggleRead(id)}
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'primary.main',
                textTransform: 'none',
                minWidth: 'auto',
                p: '4px 8px',
                '&:hover': {
                  bgcolor: 'rgba(79, 70, 229, 0.04)',
                },
              }}
            >
              {isNotificationRead ? 'Mark Unread' : 'Mark Read'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
