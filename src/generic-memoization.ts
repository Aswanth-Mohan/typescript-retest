// generic memoization

function memoize<T extends (...args: any[]) => any>(fn: T,options?: { maxSize?: number }): T{
    const cache = new Map<string, any>();
    const maxSize = options?.maxSize;
  
    return function (...args: Parameters<T>): T{
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
  const expensive = (a: number, b: string) => {
    console.log('Computing...');
    return `${a}-${b}`;
  };
  
  const memoizedFn = memoize(expensive, { maxSize: 100 });
  
  console.log(memoizedFn(1, "test")); // Computes
  console.log(memoizedFn(1, "test")); // Returns cached result
  console.log(memoizedFn(2, "test")); // Computes again
  console.log(memoizedFn(3, "test")); // Computes again
  console.log(memoizedFn(2, "test")); //  Returns cached result