import batchPromises from "../utils/batchPromises.js";

describe("batchPromises", () => {
  test("executes all tasks in correct batches and resolves results in order", async () => {
    const mockTasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4),
      () => Promise.resolve(5),
    ];

    const result = await batchPromises(mockTasks, 2);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("handles batch size larger than number of tasks", async () => {
    const mockTasks = [() => Promise.resolve("a"), () => Promise.resolve("b")];

    const result = await batchPromises(mockTasks, 10);
    expect(result).toEqual(["a", "b"]);
  });

  test("throws error if one of the tasks fails", async () => {
    const mockTasks = [
      () => Promise.resolve("ok"),
      () => Promise.reject(new Error("fail")),
      () => Promise.resolve("after"),
    ];

    await expect(batchPromises(mockTasks, 2)).rejects.toThrow(
      "Task execution failed"
    );
  });

  test("throws error if tasks is not an array", async () => {
    await expect(batchPromises("not-array", 2)).rejects.toThrow(
      "tasks must be an array"
    );
  });

  test("throws error if batchSize is not a positive integer", async () => {
    const mockTasks = [() => Promise.resolve("test")];
    await expect(batchPromises(mockTasks, 0)).rejects.toThrow(
      "batchSize must be a positive integer"
    );
    await expect(batchPromises(mockTasks, -2)).rejects.toThrow(
      "batchSize must be a positive integer"
    );
    await expect(batchPromises(mockTasks, 1.5)).rejects.toThrow(
      "batchSize must be a positive integer"
    );
  });

  test("throws error if any task is not a function", async () => {
    const mockTasks = [() => Promise.resolve(1), 2];
    await expect(batchPromises(mockTasks, 1)).rejects.toThrow(
      "All items in 'tasks' must be functions"
    );
  });
});
