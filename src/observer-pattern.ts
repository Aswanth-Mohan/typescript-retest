//Onbserver Pattern

type EventMap = {
    [K: string]: any;
  };
  
  interface Observer<T> {
    update(data: T): void | Promise<void>;
    priority?: number;
  }
  
  class TypedObservable<T extends EventMap> {
    private observers: Observer[] = [];
  
    on<K extends keyof T>(event: K, observer: Observer<T[K]>): () => void {
        this.observers.push(observer);

    // removeObserver(observer: Observer): void {
    //     const removeIndex = this.observers.findIndex(obs => observer === obs);
    //     if (removeIndex !== -1) {
    //         this.observers.splice(removeIndex, 1);
    //     }
    // }

    // notifyObservers(): void {
    //     for (let observer of this.observers) {
    //         observer.update(this);
    //     }
    }
  
    once<K extends keyof T>(event: K, observer: Observer<T[K]>): void {
      const newObserver: Observer<T[K]> = {
        ...observer,
        update: async (data) => {
          await observer.update(data);
        }
      };
    }

    async emit<K extends keyof T>(event: K, data: T[K]): Promise<void> {
  
    }
  
  }

  // Usage

  interface AppEvents {
    'user:login': { userId: string; timestamp: number };
    'data:update': { newData: any[]; source: string };
    }

const events = new TypedObservable<AppEvents>();

events.on('user:login', {
 update: ({ userId, timestamp }) => {
console.log(`User ${userId} logged in at ${timestamp}`);
    },
    priority: 1
  });

  
events.once('data:update', {
    update: async ({ newData}) => {
     console.log(newData, 'newData')
    }
  });
  
  events.emit('user:login', { userId: '1234', timestamp: Date.now() });

  events.emit('data:update', { newData: [1, 2, 3, 4], source: 'string' });

