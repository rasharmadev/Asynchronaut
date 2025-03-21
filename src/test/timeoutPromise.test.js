import timeoutPromise from "../utils/timeoutPromise";

describe("timeoutPromise()", () => {

    test("resolves if the task completes within the time limit", async () => {
        const task = () => new Promise((resolve, reject) => setTimeout(() => resolve("Task Complete"), 500));

        const result = await timeoutPromise(task, 500);

        expect(result).toBe("Task Complete");
    });
    test("rejects if the task exceeds the time limit", async () => {
        const task = () => new Promise(res => setTimeout(() => res("Task Complete"), 1000));

        await expect(timeoutPromise(task, 500)).rejects.toThrow("Timeout (ms): 500");
    });

    test("rejects with the original error if the task fails", async () => {
        const task = () => new Promise((_, rej) => setTimeout(() => rej(new Error("Task Failed")), 100));

        await expect(timeoutPromise(task, 500)).rejects.toThrow("Task Failed");
    });

    test("throws an error if task is not a function", async () => {
        await expect(timeoutPromise(null, 500)).rejects.toThrow("Invalid argument: 'task' must be a function returning a Promise.");
    });

    test("throws an error if timeLimit is not a positive number", async () => {
        const task = () => new Promise(res => res("Valid Task"));

        await expect(timeoutPromise(task, -100)).rejects.toThrow("Invalid argument: 'timeLimit' must be a positive number.");
        await expect(timeoutPromise(task, "500")).rejects.toThrow("Invalid argument: 'timeLimit' must be a positive number.");
    });

    test("returns error message if task throws synchronously", async () => {
        const task = () => { throw new Error("Synchronous Error"); };

        await expect(timeoutPromise(task, 500)).rejects.toThrow("Task execution failed: Synchronous Error");
    });

    test("resolves correctly even when the time limit is large", async () => {
        const task = () => new Promise(res => setTimeout(() => res("Task Complete"), 100));
        
        const result = await timeoutPromise(task, 1000);
        expect(result).toBe("Task Complete");
    });

    test("handles tasks that resolve immediately", async () => {
        const task = () => Promise.resolve("Immediate Task");

        const result = await timeoutPromise(task, 500);
        expect(result).toBe("Immediate Task");
    });

    test("handles tasks that reject immediately", async () => {
        const task = () => Promise.reject(new Error("Immediate Rejection"));

        await expect(timeoutPromise(task, 500)).rejects.toThrow("Immediate Rejection");
    });
});