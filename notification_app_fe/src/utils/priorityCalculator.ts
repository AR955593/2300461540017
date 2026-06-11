import { Notification } from '../types/notification';
import { PRIORITY_WEIGHTS, UNREAD_BONUS, STACK_FRONTEND } from './constants';
import { Log } from '../../../logging_middleware/logger';

/**
 * Calculates the priority score of a notification based on its:
 * 1. Type weight (Placement: 100, Result: 80, Event: 60)
 * 2. Recency (Score out of 100, decaying by 1 point per hour)
 * 3. Read status (Unread notifications get a bonus of 50)
 *
 * Formula: priorityScore = weight + recencyScore + unreadBonus
 *
 * @param notification The notification object
 * @returns The calculated priority score
 */
export function calculatePriority(notification: Notification): number {
  // 1. Calculate Weight
  let weight: number = PRIORITY_WEIGHTS.DEFAULT;
  const typeStr = (notification.type || '').toUpperCase();
  if (typeStr === 'PLACEMENT') {
    weight = PRIORITY_WEIGHTS.PLACEMENT;
  } else if (typeStr === 'RESULT') {
    weight = PRIORITY_WEIGHTS.RESULT;
  } else if (typeStr === 'EVENT') {
    weight = PRIORITY_WEIGHTS.EVENT;
  }

  // 2. Calculate Recency Score
  let recencyScore = 0;
  const dateVal = notification.date || notification.timestamp;
  const parsedDate = dateVal ? new Date(dateVal) : null;
  if (parsedDate && !isNaN(parsedDate.getTime())) {
    const ageMs = Math.max(0, Date.now() - parsedDate.getTime());
    const ageHours = ageMs / (1000 * 60 * 60);
    // Linear decay: 100 - age in hours, floor at 0
    recencyScore = Math.max(0, 100 - ageHours);
  } else {
    // If no date or invalid date, default recency score to 0
    recencyScore = 0;
  }

  // 3. Calculate Unread Bonus
  const isRead = notification.read ?? notification.isRead ?? false;
  const unreadBonus = isRead ? 0 : UNREAD_BONUS;

  const score = Math.round((weight + recencyScore + unreadBonus) * 100) / 100;

  // Log priority calculation as requested (triggers async log call)
  Log(
    STACK_FRONTEND,
    'debug',
    'utils',
    `Priority calculation completed for notification ID ${notification.id}. Score: ${score} (Weight: ${weight}, Recency: ${recencyScore.toFixed(2)}, Unread Bonus: ${unreadBonus})`
  ).catch((err) => console.error('[Priority Engine Logger Fail]', err));

  return score;
}

/**
 * Sorts notifications by descending priority score and retrieves the top N.
 *
 * @param notifications List of notifications
 * @param topN Number of notifications to return
 * @returns Sorted slice of top N notifications
 */
export function getTopNotifications(notifications: Notification[], topN: number): Notification[] {
  // Calculate priority score for each notification first and attach it
  const notificationsWithScores = notifications.map((n) => ({
    ...n,
    priorityScore: calculatePriority(n),
  }));

  // Sort descending by priority score
  const sorted = notificationsWithScores.sort((a, b) => {
    const scoreA = a.priorityScore ?? 0;
    const scoreB = b.priorityScore ?? 0;
    return scoreB - scoreA;
  });

  return sorted.slice(0, topN);
}
