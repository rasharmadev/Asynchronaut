// Async execution and tasks get pushed into microtask
async function runSequentially_m1 (tasks) {
    return tasks.reduce((promiseChain, task) => {
        return promiseChain.then(allResults => {
            return task().then(result => [...allResults, result]);
        })
    }, Promise.resolve([]));
};

// Async execution but current task blocking
async function runSequentially_m2 (tasks) {
    const results = [];
    for(const task of tasks) {
        results.push(await task());
    }
    return results;
}

export default runSequentially_m1;