"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TypedObservable {
    constructor() {
        this.observers = [];
    }
    on(event, observer) {
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
    once(event, observer) {
        const newObserver = Object.assign(Object.assign({}, observer), { update: (data) => __awaiter(this, void 0, void 0, function* () {
                yield observer.update(data);
            }) });
    }
    emit(event, data) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const events = new TypedObservable();
events.on('user:login', {
    update: ({ userId, timestamp }) => {
        console.log(`User ${userId} logged in at ${timestamp}`);
    },
    priority: 1
});
events.once('data:update', {
    update: (_a) => __awaiter(void 0, [_a], void 0, function* ({ newData }) {
        console.log(newData, 'newData');
    })
});
events.emit('user:login', { userId: '1234', timestamp: Date.now() });
events.emit('data:update', { newData: [1, 2, 3, 4], source: 'string' });
