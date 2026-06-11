/**
 * Application-wide configuration and algorithmic constants.
 */

// API Configuration
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://20.244.56.144/evaluation-service';
export const ACCESS_TOKEN = (import.meta as any).env?.VITE_ACCESS_TOKEN || '';

// Priority Engine Weights
export const PRIORITY_WEIGHTS = {
  PLACEMENT: 100,
  RESULT: 80,
  EVENT: 60,
  DEFAULT: 40,
} as const;

// Priority Engine Unread Bonus
export const UNREAD_BONUS = 50;

// Selector Choices for Top N notifications
export const TOP_N_CHOICES = [10, 15, 20] as const;
export type TopNChoice = (typeof TOP_N_CHOICES)[number];

// Logger Configurations
export const STACK_FRONTEND = 'frontend' as const;
