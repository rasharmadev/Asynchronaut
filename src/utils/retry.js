/**
 * Retries an asynchronous function a specified number of times before failing.
 * 
 * @param {Function} fn - The asynchronous function returning a Promise to be retried.
 * @param {number} retries - The maximum number of retry attempts.
 * @param {number} [delay=0] - Optional delay in milliseconds between retries.
 * @returns {Promise<any>} - A Promise that resolves with the result of the function or rejects with the last encountered error.
 * @throws {Error} - If fn is not a function, retries is not a positive integer, or delay is not a non-negative number.
 */
async function retry_m1 (fn, retries, delay = 0) {
    // Input Validation
    if(typeof fn !== 'function') {
        throw new Error("Invalid argument: 'fn' must be a function returning a Promise.");
    }

    if(!Number.isInteger(retries) || retries < 0) {
        throw new Error("Invalid argument: 'retries' must be a non-negative integer.");
    }

    if(typeof delay !== 'number' || delay < 0) {
        throw new Error("Invalid argument: 'delay' must be a non-negative number.");
    }


    let lastError;

    for(let i = 0; i <= retries; i++) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            lastError = error;

            if (i < retries && delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay)); // Delay between retries.
            }
        }
    }

    throw lastError;
};

export default retry_m1;