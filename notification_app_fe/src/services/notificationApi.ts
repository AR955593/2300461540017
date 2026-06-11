import { Notification } from '../types/notification';
import { API_BASE_URL, ACCESS_TOKEN, STACK_FRONTEND } from '../utils/constants';
import { Log } from '../../../logging_middleware/logger';

/**
 * Fetches notifications from the evaluation service backend.
 * Integrates Bearer authorization and logs the result.
 *
 * @returns Promise containing the loaded notifications array
 */
export async function fetchNotifications(): Promise<Notification[]> {
  const url = `${API_BASE_URL}/notifications`;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (ACCESS_TOKEN) {
      headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorMsg = `HTTP Error status ${response.status}: ${response.statusText}`;
      // Log API Failure
      await Log(STACK_FRONTEND, 'error', 'api', `API failure: Fetching notifications failed. ${errorMsg}`);
      throw new Error(errorMsg);
    }

    const data = (await response.json()) as Notification[];

    if (!Array.isArray(data)) {
      const errorMsg = 'Invalid data format returned by server. Expected an array.';
      await Log(STACK_FRONTEND, 'error', 'api', `API failure: ${errorMsg}`);
      throw new Error(errorMsg);
    }

    // Log API Success
    await Log(
      STACK_FRONTEND,
      'info',
      'api',
      `API success: Successfully fetched ${data.length} notifications from server`
    );

    return data;
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    // Log API Failure (only log here if not already logged above)
    await Log(STACK_FRONTEND, 'error', 'api', `API failure: Fetching notifications threw exception. Error: ${errorMsg}`);
    throw new Error(errorMsg);
  }
}
