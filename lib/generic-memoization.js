"use strict";
// generic memoization
function memoize(fn, options) {
    const cache = new Map();
    const maxSize = options === null || options === void 0 ? void 0 : options.maxSize;
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        if (cache.size > maxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        return result;
    };
}
// Usage example
const expensive = (a, b) => {
    console.log('Computing...');
    return `${a}-${b}`;
};
const memoizedFn = memoize(expensive, { maxSize: 100 });
console.log(memoizedFn(1, "test")); // Computes
console.log(memoizedFn(1, "test")); // Returns cached result
console.log(memoizedFn(2, "test")); // Computes again
console.log(memoizedFn(3, "test")); // Computes again
console.log(memoizedFn(2, "test")); //  Returns cached result
