/**
 * Asynchronous resilience utilities for serverless execution.
 */

/**
 * Wraps a promise with an execution deadline. Rejects if the promise does not settle within the given timeout.
 *
 * @template T
 * @param {Promise<T>} promise - The asynchronous operation to monitor.
 * @param {number} timeoutMs - Maximum allowed duration in milliseconds.
 * @param {string} [operationName='Operation'] - Descriptive label for debugging and error reporting.
 * @returns {Promise<T>} Resolves with the promise value or rejects on timeout.
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operationName: string = 'Operation'
): Promise<T> {
  let timerId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId) {
      clearTimeout(timerId);
    }
  }
}
