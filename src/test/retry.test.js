import retry from "../utils/retry.js";

describe("retry()", () => {

    test("succeeds within retry limit", async () => {
        let attempts = 0;
        const fn = () => {
            attempts++;
            if (attempts < 3) return Promise.reject(new Error("Fail"));
            return Promise.resolve("Success");
        };

        const result = await retry(fn, 5);
        expect(result).toBe("Success");
        expect(attempts).toBe(3);
    });

    test("fails after exhausting retries", async () => {
        let attempts = 0;
        const fn = () => {
            attempts++;
            return Promise.reject(new Error("Fail"));
        };

        await expect(retry(fn, 3)).rejects.toThrow("Fail");
        expect(attempts).toBe(4); // 3 retries + 1 initial attempt
    });

    test("executes successfully on first attempt", async () => {
        const fn = jest.fn().mockResolvedValue(Promise.resolve("Success"));

        const result = await retry(fn, 3);
        expect(result).toBe("Success");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test("throws error if non-function is passed as fn", async () => {
        await expect(retry(null, 3)).rejects.toThrow("Invalid argument: 'fn' must be a function returning a Promise.");
    });

    test("throws error if retries is not a positive integer", async () => {
        const fn = jest.fn().mockResolvedValue(Promise.resolve("Success"));

        await expect(retry(fn, -1)).rejects.toThrow("Invalid argument: 'retries' must be a non-negative integer.");
    });

    test("throws error if delay is not a valid number", async () => {
        const fn = jest.fn().mockResolvedValue(Promise.resolve("Success"));

        await expect(retry(fn, 3, -100)).rejects.toThrow("Invalid argument: 'delay' must be a non-negative number.");
    });

    test("applies delay between retries", async () => {
        let attempts = 0;
        const fn = () => {
            attempts++;
            if (attempts < 3) return Promise.reject(new Error("Fail"));
            return Promise.resolve("Success");
        };

        const start = Date.now();
        const result = await retry(fn, 5, 100);
        const duration = Date.now() - start;

        expect(result).toBe("Success");
        expect(attempts).toBe(3);
        expect(duration).toBeGreaterThanOrEqual(200);
    });

});