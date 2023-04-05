const storeHolder = {
  store: {},
  storeNode: class {
    value = 0;

    constructor(val = null) {
      this.value = val;
      this.subscribers = {};
    }

    set setter(val) {
      let a = this.value;
      let b = val;
      // не совсем верно, но для данного случая пойдет
      if (typeof val === "object") {
        a = JSON.stringify(a);
        b = JSON.stringify(b);
      }
      if (a !== b) {
        this.processSubscribers(val);
      }
      this.value = val;
    }

    get getter() {
      return this.value;
    }

    unSubscribe(uuid) {
      delete this.subscribers[uuid];
    }

    subscribe(cb) {
      let uuid = null;
      while (this.subscribers[uuid] || !uuid) {
        uuid = `${(~~(Math.random() * 1e8)).toString(16)}-${(~~(
          Math.random() * 1e8
        )).toString(16)}-${(~~(Math.random() * 1e8)).toString(16)}`;
      }

      this.subscribers[uuid] = cb;
      cb(this.value);
      return uuid;
    }

    processSubscribers = (val) => {
      for (let uuid in this.subscribers) {
        this.subscribers[uuid](val);
      }
    };
  },
};

export const Extract = (varName) => {
  if (varName && storeHolder.store[varName]) {
    return storeHolder.store[varName].value;
  } else {
    throw new Error(`Store.Dispatch: variable '${varName}' not found`);
  }
};

export const Dispatch = (varName, val) => {
  if (varName && storeHolder.store[varName]) {
    storeHolder.store[varName].setter = val;
  } else {
    throw new Error(`Store.Dispatch: wrong variable '${varName}'`);
  }
};

export const Subscribe = (varName, cb) => {
  if (varName && storeHolder.store[varName]) {
    return { varName: varName, uuid: storeHolder.store[varName].subscribe(cb) };
  } else {
    throw new Error(`Store.Subscribe: wrong variable '${varName}'`);
  }
};

export const UnSubscribe = (subs) => {
  const { varName, uuid } = { ...subs };
  if (varName && storeHolder.store[varName]) {
    storeHolder.store[varName].unSubscribe(uuid);
  } else {
    throw new Error(`Store.UnSubscribe: wrong variable '${varName}'`);
  }
};

export const Store = (varName = null, val = null) => {
  if (!varName) {
    throw new Error(`Store.Store: wrong variable '${varName}'`);
  } else {
    storeHolder.store[varName] = new storeHolder.storeNode(val);
    return true;
  }
};

export const ClearStore = () => {
  storeHolder.store = {};
};
