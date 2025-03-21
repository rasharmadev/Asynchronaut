/**
 * Executes a given asynchronous task with a specified timeout limit.
 * If the task does not complete within the time limit, the promise is rejected.
 * 
 * @param {Function} task - The asynchronous task function returning a Promise.
 * @param {number} timeLimit - The maximum allowed time in milliseconds before timing out.
 * @returns {Promise<any>} - A Promise that resolves with the task's result or rejects with a timeout error.
 * @throws {Error} - If the task is not a function or timeLimit is not a positive number.
 */
async function timeoutPromise(task, timeLimit) {
    // Input Validation
    if (typeof task !== 'function') {
        throw new Error("Invalid argument: 'task' must be a function returning a Promise.");
    }

    if (typeof timeLimit !== 'number' || timeLimit <= 0) {
        throw new Error("Invalid argument: 'timeLimit' must be a positive number.");
    }

    // Run the task and store the resulting promise.
    let resultPromise;
    try {
        resultPromise = task();
    } catch (error) {
        return Promise.reject(new Error(`Task execution failed: ${error.message}`));
    }

    // Return a new promise that races between task completion and timeout.
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout (ms): ${timeLimit}`));
        }, timeLimit);

        resultPromise
            .then((result) => {
                clearTimeout(timer);  // Clear the timer if the task completes successfully
                resolve(result);
            })
            .catch((error) => {
                clearTimeout(timer);  // Clear the timer if the task fails
                reject(error);         // Reject with the original error
            });
    });
}

export default timeoutPromise;