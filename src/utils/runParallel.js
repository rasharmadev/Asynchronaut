/**
 * Executes an array of asynchronous tasks in parallel and resolves when all tasks are completed.
 * 
 * @param {Function[]} tasks - An array of functions returning Promises.
 * @returns {Promise<any[]>} - A Promise that resolves with an array of results from all tasks.
 * @throws {Error} - If tasks is not an array or any item in tasks is not a function.
 */
async function runParallel_m1(tasks) {
    // Input Validation
    if (!Array.isArray(tasks)) {
        throw new Error("Invalid argument: 'tasks' must be an array of functions.");
    }

    if (tasks.some(task => typeof task !== 'function')) {
        throw new Error("Invalid argument: All items in the 'tasks' array must be functions returning Promises.");
    }

    try {
        // Execute all tasks in parallel
        return await Promise.all(tasks.map(task => {
            const result = task();
            return result;
        }));
    } catch (error) {
        return Promise.reject(new Error(`Task execution failed: ${error.message}`));
    }
}

export default runParallel_m1;