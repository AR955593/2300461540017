import { LogLevel, LogPackage, LogStack } from '../../../logging_middleware/logger';

export type NotificationType = 'Placement' | 'Result' | 'Event' | string;

export interface Notification {
  id: string | number;
  title: string;
  type: NotificationType;
  /** ISO Date string or formatted date representation */
  date?: string;
  /** Alternate property name for date/timestamp */
  timestamp?: string;
  /** Read status flag */
  read?: boolean;
  /** Alternate read status flag */
  isRead?: boolean;
  /** Client-side calculated priority score */
  priorityScore?: number;
}

export interface LogPayload {
  stack: LogStack;
  level: LogLevel;
  packageName: LogPackage;
  message: string;
}
