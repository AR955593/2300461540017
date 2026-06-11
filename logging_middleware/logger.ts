/**
 * Reusable logging middleware for the Campus Notifications Priority Inbox.
 * Handles sending application logs to the evaluation server.
 */

export type LogStack = 'frontend';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export type LogPackage =
  | 'api'
  | 'component'
  | 'hook'
  | 'page'
  | 'state'
  | 'style'
  | 'auth'
  | 'config'
  | 'middleware'
  | 'utils';

/**
 * Sends a log entry to the remote evaluation logging service.
 * Consoles the log locally as a fallback or in development mode.
 *
 * @param stack The system tier, allowed value: 'frontend'
 * @param level Severity level of the log
 * @param packageName The application sub-package generating the log
 * @param message Description of the event or state
 */
export async function Log(
  stack: LogStack,
  level: LogLevel,
  packageName: LogPackage,
  message: string
): Promise<void> {
  const payload = {
    stack,
    level,
    package: packageName,     // Sending both 'package' and 'packageName' to cover
    packageName: packageName, // different backend parsing behaviors.
    message,
    timestamp: new Date().toISOString()
  };

  // Local fallback logging
  const consoleMethod = level === 'error' || level === 'fatal' ? 'error' : level === 'warn' ? 'warn' : 'log';
  console[consoleMethod](`[${level.toUpperCase()}] [${packageName.toUpperCase()}] ${message}`, payload);

  try {
    const response = await fetch('http://4.244.186.213/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Logging Middleware] Failed to transmit log. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('[Logging Middleware] Error posting log to remote server:', error);
  }
}
