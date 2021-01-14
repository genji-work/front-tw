
type Handle = Array<Function> | Function

class EventBus {
  _events: Map<string, Handle> = new Map();

  _maxListeners?: number = 10;

  static instance?: EventBus;

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  emit = (type: string, ...args: any[]) => {
    const handler = this._events.get(type);
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        if (args.length > 0) {
          handler[i].apply(this, args);
        } else {
          handler[i].call(this);
        }
      }
    } else if (args.length > 0) {
      if (handler) {
        handler.apply(this, args);
      }
    } else if (handler) {
      handler.call(this);
    }

    return true;
  };

  addListener = (type: string, fn: Function) => {
    const handler = this._events.get(type);
    if (!handler) {
      this._events.set(type, fn);
    } else if (handler && typeof handler === 'function') {
      this._events.set(type, [handler, fn]);
    } else {
      (handler).push(fn);
    }
  };

  removeListener = (type: string, fn: Array<Function> | Function) => {
    const handler = this._events.get(type) as Handle;
    if (handler && typeof handler === 'function') {
      this._events.delete(type);
    } else {
      let position = -1;
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          position = i;
        } else {
          position = -1;
        }
      }
      if (position !== -1) {
        handler.splice(position, 1);
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
    return null;
  };
}

export default EventBus.getInstance();
