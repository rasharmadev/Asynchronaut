import runParallel from "../utils/runParallel.js";

test('run tasks parallely', async () => {
    const tasks = [
        () => new Promise(res => setTimeout(() => res("Task 1 done"), 1000)),
        () => new Promise(res => setTimeout(() => res("Task 2 done"), 1000)),
        () => new Promise(res => setTimeout(() => res("Task 3 done"), 1000))
    ];

    const result = await runParallel(tasks);

    expect(result).toEqual(["Task 1 done", "Task 2 done", "Task 3 done"]);
});