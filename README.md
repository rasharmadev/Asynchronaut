# Asynchronaut 🚀

Asynchronaut is a powerful utility library for handling JavaScript promises like a pro. Simplify your async workflows with easy-to-use functions like `runSequentially`, `runParallel`, and `retry`.

More to be added soon.

## Installation
```
npm install asynchronaut
```

## Usage
Import the functions you need:
```javascript
const { runSequentially, runParallel, retry } = require('asynchronaut');
```
Or, if you're using ESM:
```javascript
import { runSequentially, runParallel, retry } from 'asynchronaut';
```

## 📌 **Available Functions**

### 1. `runSequentially`
- Executes an array of async tasks one after another in sequence.  
- Returns a promise that resolves with an array of results.  

### 2. `runParallel`
- Executes an array of async tasks simultaneously.  
- Returns a promise that resolves with an array of results when all tasks are completed.  

### 3. `retry`
- Retries a provided async function a specified number of times until it succeeds or retries are exhausted.
- Returns a promise that resolves with the successful result or rejects if all attempts fail.

## 📖 License
MIT

## 💡 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 🌟 Inspiration
Asynchronaut helps you navigate the cosmos of asynchronous JavaScript with ease and elegance!
