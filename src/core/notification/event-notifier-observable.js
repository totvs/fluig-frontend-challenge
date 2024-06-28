export class EventNotifierObservable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export class EventListenerObserver {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
  }

  update(data) {
    console.log(`${this.name} received data:`, data);
    if (typeof this.callback === "function") {
      this.callback(data);
    }
  }
}
