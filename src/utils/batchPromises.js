/**
 * Processes an array of async tasks in batches of given size.
 *
 * @param {Function[]} tasks - An array of functions returning Promises.
 * @param {number} batchSize - Number of promises to run in parallel per batch.
 * @returns {Promise<any[]>} - A promise that resolves with all results in order.
 * @throws {Error} - If inputs are invalid or a particular task execution fails.
 */
async function batchPromises(tasks, batchSize) {
  if (!Array.isArray(tasks)) {
    throw new Error("Invalid input: tasks must be an array of functions.");
  }
  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new Error("Invalid input: batchSize must be a positive integer.");
  }
  if (tasks.some((task) => typeof task !== "function")) {
    throw new Error("All items in 'tasks' must be functions");
  }

  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize).map((task) => task());

    let batchResults;

    try {
      batchResults = await Promise.all(batch);
    } catch (err) {
      throw new Error(
        `Asynchronaut: Task execution failed in batch starting at index ${i}: ${err.message}`
      );
    }

    results.push(...batchResults);
  }

  return results;
}

export default batchPromises;
