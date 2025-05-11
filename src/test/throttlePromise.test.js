import throttlePromise from "../utils/throttlePromise.js";

describe("throttlePromise()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("throttle function calls", () => {
    const mockFn = jest.fn().mockResolvedValue("result");
    const throttle = throttlePromise(mockFn, 100);

    throttle("test");
    throttle("test");

    jest.advanceTimersByTime(200);

    throttle("test");
    throttle("test");

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
