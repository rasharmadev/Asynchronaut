import runParallel from "../utils/runParallel.js";

describe("runParallel()", () => {

    test("executes tasks in parallel and returns results", async () => {
        const tasks = [
            () => new Promise(res => setTimeout(() => res("Task 1 done"), 500)),
            () => new Promise(res => setTimeout(() => res("Task 2 done"), 300)),
            () => new Promise(res => setTimeout(() => res("Task 3 done"), 100))
        ];

        const start = Date.now();
        const result = await runParallel(tasks);
        const duration = Date.now() - start;

        expect(result).toEqual(["Task 1 done", "Task 2 done", "Task 3 done"]);
        expect(duration).toBeLessThan(600); // All tasks completed in parallel, so duration < 500ms
    });

    test("throws an error if tasks is not an array", async () => {
        await expect(runParallel(null)).rejects.toThrow("Invalid argument: 'tasks' must be an array of functions.");
    });

    test("throws an error if tasks array contains non-functions", async () => {
        const invalidTasks = [() => Promise.resolve("Valid task"), "Invalid task"];
        
        await expect(runParallel(invalidTasks)).rejects.toThrow("Invalid argument: All items in the 'tasks' array must be functions returning Promises.");
    });

    test("rejects if any task fails", async () => {
        const tasks = [
            () => new Promise(res => setTimeout(() => res("Task 1 done"), 100)),
            () => new Promise((_, rej) => setTimeout(() => rej(new Error("Task 2 failed")), 100)),
            () => new Promise(res => setTimeout(() => res("Task 3 done"), 100))
        ];

        await expect(runParallel(tasks)).rejects.toThrow("Task execution failed: Task 2 failed");
    });

    test("handles an empty array of tasks", async () => {
        const result = await runParallel([]);
        expect(result).toEqual([]);
    });

    test("executes single task and returns result", async () => {
        const tasks = [
            () => new Promise(res => setTimeout(() => res("Only task done"), 100))
        ];

        const result = await runParallel(tasks);
        expect(result).toEqual(["Only task done"]);
    });

});