import retry from "../utils/retry.js";

test('retries the function on failure', async () => {
    let attempts = 0;
    const fn = () => {
        attempts++;
        if (attempts < 4) return Promise.reject("Fail");
        return Promise.resolve("Success");
    };

    const result = await retry(fn, 5);
    expect(result).toBe("Success");
});