async function runParallel_m1 (tasks) {
    return Promise.all(tasks.map(task => task()));
}

export default runParallel_m1;