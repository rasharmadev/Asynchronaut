/**
 * Throttles an asynchronous task function that returns a Promise,
 * ensuring it is not executed more than once in the specified delay period.
 *
 * @param {Function} task - The asynchronous function to be throttled. Must return a Promise.
 * @param {number} delay - The minimum time interval (in milliseconds) between task executions.
 * @returns {Function} - A throttled version of the task function.
 * @throws {Error} - If task is not a function or delay is not a positive number.
 *
 * @example
 * const throttled = throttlePromise(() => fetch('/data'), 1000);
 * setInterval(throttled, 200);
 */
function throttlePromise(task, delay) {
  if (typeof task !== "function") {
    throw new Error(
      "Invalid argument: 'task' must be a function returning a Promise."
    );
  }

  if (typeof delay !== "number" || delay <= 0 || !Number.isFinite(delay)) {
    throw new Error("Invalid argument: 'delay' must be a positive number.");
  }

  let lastCall = 0;

  return function throttledTask(...args) {
    const now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;

    return task.apply(this, args);
  };
}

export default throttlePromise;
