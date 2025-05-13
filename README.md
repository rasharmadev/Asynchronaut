# Asynchronaut 🚀

Asynchronaut is a powerful utility library for handling JavaScript promises like a pro. Simplify your async workflows with easy-to-use functions like `runSequentially`, `runParallel`, and `retry` and many more.

More to be added soon.

## Installation

```
npm install asynchronaut
```

## Usage

Import the functions you need:

```javascript
const { runSequentially, runParallel } = require("asynchronaut");
```

Or, if you're using ESM:

```javascript
import { runSequentially, runParallel } from "asynchronaut";

// Sample tasks
const tasks = [
  () => new Promise((res) => setTimeout(() => res("Task 1 Complete"), 1000)),
  () => new Promise((res) => setTimeout(() => res("Task 2 Complete"), 500)),
  () => new Promise((res) => setTimeout(() => res("Task 3 Complete"), 300)),
];

(async () => {
  try {
    const results = await runSequentially(tasks);
    console.log(results);
    // Output: ["Task 1 Complete", "Task 2 Complete", "Task 3 Complete"]
  } catch (error) {
    console.error(error.message);
  }
})();

(async () => {
  try {
    const results = await runParallel(tasks);
    console.log(results);
    // Output: ["Task 1 Complete", "Task 2 Complete", "Task 3 Complete"]
  } catch (error) {
    console.error(error.message);
  }
})();
```

## 📌 **Available Functions**

For usage details, checkout `src/test/`

### 1. `runSequentially`

- Executes an array of async tasks one after another in sequence.
- Returns a promise that resolves with an array of results.

### 2. `runParallel`

- Executes an array of async tasks simultaneously.
- Returns a promise that resolves with an array of results when all tasks are completed.

### 3. `retry`

- Retries a provided async function a specified number of times until it succeeds or retries are exhausted.
- Returns a promise that resolves with the successful result or rejects if all attempts fail.

### 4. `timeoutPromise`

- Executes a given asynchronous task with a specified timeout limit. If the task does not complete within the time limit, the promise is rejected.
- Returns a Promise that resolves with the task's result or rejects with a timeout error.

### 5. `debouncePromise`

- Delays the execution of async task until after a specified wait time.
- Returns a Promise that resolves with the task's result or rejects with a timeout error.

### 6. `throttlePromise`

- Throttles an asynchronous task function that returns a Promise, ensuring it is not executed more than once in the specified delay period.

### 7. `batchPromises`

- Processes an array of async tasks in batches of given size.
- A possible use case can be, "How can I run 100 API calls but only 5 at a time to avoid overloading the server?" -> Use asynchronaut's batchPromises() function.

## Running Tests (Jest)

```
npm test
```

## 📖 License

MIT

## 💡 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 🌟 Inspiration

Asynchronaut helps you navigate the cosmos of asynchronous JavaScript with ease and elegance!
