export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(type, handler) {
    const handlers = this.listeners.get(type) ?? new Set();
    handlers.add(handler);
    this.listeners.set(type, handlers);
    return () => this.off(type, handler);
  }

  off(type, handler) {
    this.listeners.get(type)?.delete(handler);
  }

  emit(type, payload) {
    this.listeners.get(type)?.forEach((handler) => handler(payload));
  }

  clear() {
    this.listeners.clear();
  }
}
