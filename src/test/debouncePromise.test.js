import debouncePromise from "../utils/debouncePromise.js";

describe("debouncePromise()", () => {
    
    beforeEach(() => {
        jest.useFakeTimers();
    });
    
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    
    test("debounces function calls", () => {
        const mockFn = jest.fn().mockResolvedValue("result");
        const debounced = debouncePromise(mockFn, 100);
        
        debounced("test");
        debounced("test");
        debounced("test");
        
        expect(mockFn).not.toHaveBeenCalled();
        
        jest.runAllTimers();
        
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("test");
    });
    
    test("respects delay timing", () => {
        const mockFn = jest.fn().mockResolvedValue("result");
        const debounced = debouncePromise(mockFn, 200);
        
        debounced();
        
        jest.advanceTimersByTime(100);
        expect(mockFn).not.toHaveBeenCalled();
        
        jest.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
    
    test("resets timer on subsequent calls", () => {
        const mockFn = jest.fn().mockResolvedValue("result");
        const debounced = debouncePromise(mockFn, 100);
        
        debounced();
        jest.advanceTimersByTime(50);
        
        debounced();
        jest.advanceTimersByTime(50);
        expect(mockFn).not.toHaveBeenCalled();
        
        jest.advanceTimersByTime(50);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
    
    test("preserves this context", () => {
        const context = {
            value: "test",
            fn: function() {
                return this.value;
            }
        };
        
        const spy = jest.spyOn(context, 'fn');
        const debounced = debouncePromise(context.fn, 100);
        
        debounced.call(context);
        jest.runAllTimers();
        
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.instances[0]).toBe(context);
    });
    
    test("passes arguments correctly", () => {
        const mockFn = jest.fn((a, b) => a + b);
        const debounced = debouncePromise(mockFn, 100);
        
        debounced(1, 2);
        jest.runAllTimers();
        
        expect(mockFn).toHaveBeenCalledWith(1, 2);
    });
    
    test("cancels pending executions", () => {
        const mockFn = jest.fn().mockResolvedValue("result");
        const debounced = debouncePromise(mockFn, 100);
        
        debounced();
        debounced.cancel();
        
        jest.runAllTimers();
        
        expect(mockFn).not.toHaveBeenCalled();
    });
    
    test("handles non-promise return values", () => {
        const mockFn = jest.fn(() => "result");
        const debounced = debouncePromise(mockFn, 100);
        
        const promise = debounced();
        jest.runAllTimers();
        
        return promise.then(result => {
            expect(result).toBe("result");
        });
    });
    
    test("propagates errors from the debounced function", () => {
        const error = new Error("Test error");
        const mockFn = jest.fn(() => {
            throw error;
        });
        const debounced = debouncePromise(mockFn, 100);
        
        const promise = debounced();
        jest.runAllTimers();
        
        return expect(promise).rejects.toThrow("Test error");
    });
    
    test("throws error if non-function is passed as fn", () => {
        expect(() => {
            debouncePromise(null, 100);
        }).toThrow("Invalid argument: 'fn' must be a function returning a Promise.");
    });
    
    test("throws error if delay is not a positive number", () => {
        expect(() => {
            debouncePromise(() => {}, -100);
        }).toThrow("Invalid argument: 'delay' must be a positive number.");
        
        expect(() => {
            debouncePromise(() => {}, "100");
        }).toThrow("Invalid argument: 'delay' must be a positive number.");
    });
});
