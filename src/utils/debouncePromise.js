/**
 * Creates a debounced version of an asynchronous function that returns a Promise.
 * The debounced function delays invoking the provided function until after the
 * specified delay time has passed since it was last called.
 *
 * @param {Function} fn - The asynchronous function returning a Promise to be debounced.
 * @param {number} delay - The number of milliseconds to delay execution.
 * @returns {Function} - A debounced function that returns a Promise resolving with the result.
 */
function debouncePromise(fn, delay) {
  if (typeof fn !== "function") {
    throw new Error(
      "Invalid argument: 'fn' must be a function returning a Promise."
    );
  }

  if (typeof delay !== "number" || delay <= 0) {
    throw new Error("Invalid argument: 'delay' must be a positive number.");
  }

  let timeout;

  const debounced = function (...args) {
    const context = this;

    return new Promise((resolve, reject) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        try {
          const result = fn.apply(context, args);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

export default debouncePromise;
