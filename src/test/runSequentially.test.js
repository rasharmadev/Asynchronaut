import runSequentially from "../utils/runSequentially.js";

test('run tasks sequentially', async () => {
    const tasks = [
        () => new Promise(res => setTimeout(() => res("Task 1 done"), 1000)),
        () => new Promise(res => setTimeout(() => res("Task 2 done"), 1000)),
        () => new Promise(res => setTimeout(() => res("Task 3 done"), 1000))
    ];

    const result = await runSequentially(tasks);

    expect(result).toEqual(["Task 1 done", "Task 2 done", "Task 3 done"]);
});