/**
 * Executes an array of asynchronous tasks sequentially using reduce.
 * 
 * @param {Function[]} tasks - An array of functions returning Promises.
 * @returns {Promise<any[]>} - A Promise that resolves with an array of results from all tasks.
 * @throws {Error} - If tasks is not an array or any item in tasks is not a function.
 */
async function runSequentially_m1(tasks) {
    // Input Validation
    if (!Array.isArray(tasks)) {
        throw new Error("Invalid argument: 'tasks' must be an array of functions.");
    }

    if (tasks.some(task => typeof task !== 'function')) {
        throw new Error("Invalid argument: All items in the 'tasks' array must be functions returning Promises.");
    }

    // Process tasks sequentially
    try {
        return tasks.reduce(async (promiseChain, task) => {
            const allResults = await promiseChain;
            const result = await task();
            return [...allResults, result];
        }, Promise.resolve([]));
    } catch (error) {
        return Promise.reject(new Error(`Task execution failed: ${error.message}`));
    }
}

/**
 * Executes an array of asynchronous tasks sequentially using a for-await-of loop.
 * 
 * @param {Function[]} tasks - An array of functions returning Promises.
 * @returns {Promise<any[]>} - A Promise that resolves with an array of results from all tasks.
 * @throws {Error} - If tasks is not an array or any item in tasks is not a function.
 */
async function runSequentially_m2(tasks) {
    // Input Validation
    if (!Array.isArray(tasks)) {
        throw new Error("Invalid argument: 'tasks' must be an array of functions.");
    }

    if (tasks.some(task => typeof task !== 'function')) {
        throw new Error("Invalid argument: All items in the 'tasks' array must be functions returning Promises.");
    }

    const results = [];

    for (const task of tasks) {
        try {
            const result = await task();
            results.push(result);
        } catch (error) {
            return Promise.reject(new Error(`Task execution failed: ${error.message}`));
        }
    }

    return results;
}

export default runSequentially_m1;