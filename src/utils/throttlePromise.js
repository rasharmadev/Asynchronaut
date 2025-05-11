function throttlePromise(task, delay) {
  if (typeof task !== "function") {
    throw new Error(
      "Invalid argument: 'task' must be a function returning a Promise."
    );
  }

  if (typeof delay !== "number" || delay <= 0 || !Number.isFinite(delay)) {
    throw new Error("Invalid argument: 'delay' must be a positive number.");
  }

  let lastCall = 0;

  return function throttledTask(...args) {
    const now = new Date().getTime();

    if (now - lastCall > delay) {
      lastCall = now;

      return task.apply(this, args);
    }
  };
}

export default throttlePromise;
