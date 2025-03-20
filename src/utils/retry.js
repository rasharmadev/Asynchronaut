async function retry_m1 (fn, retries) {
    let lastError;
    for(let i = 0; i <= retries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
};

export default retry_m1;