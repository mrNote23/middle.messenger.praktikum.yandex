export type TStoreHolder = {
  store: {};
  storeNode: any;
};

export type TSubscriberItem = {
  varName: string;
  uuid: string;
};

const storeHolder: TStoreHolder = {
  store: {},
  storeNode: class {
    value: any = 0;
    subscribers: {};

    constructor(val = null) {
      this.value = val;
      this.subscribers = {};
    }

    set setter(val: any) {
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

    get getter(): any {
      return this.value;
    }

    unSubscribe(uuid: string): void {
      delete this.subscribers[uuid];
    }

    subscribe(cb: object): string {
      let uuid = null;
      while (this.subscribers[uuid] || !uuid) {
        uuid = `${(~~(Math.random() * 1e8)).toString(16)}-${(~~(
          Math.random() * 1e8
        )).toString(16)}-${(~~(Math.random() * 1e8)).toString(16)}`;
      }

      this.subscribers[uuid] = cb;
      cb.call(this.value);
      return uuid;
    }

    processSubscribers = (val: any): void => {
      for (let uuid in this.subscribers) {
        this.subscribers[uuid](val);
      }
    };
  },
};

export const Extract = (varName: string): any => {
  if (varName && storeHolder.store[varName]) {
    return storeHolder.store[varName].value;
  } else {
    throw new Error(`Store.Dispatch: variable '${varName}' not found`);
  }
};

export const Dispatch = (varName: string, val: any): void => {
  if (varName && storeHolder.store[varName]) {
    storeHolder.store[varName].setter = val;
  } else {
    throw new Error(`Store.Dispatch: wrong variable '${varName}'`);
  }
};

export const Subscribe = (varName: string, cb: object): TSubscriberItem => {
  if (varName && storeHolder.store[varName]) {
    return { varName: varName, uuid: storeHolder.store[varName].subscribe(cb) };
  } else {
    throw new Error(`Store.Subscribe: wrong variable '${varName}'`);
  }
};

export const UnSubscribe = (subs: TSubscriberItem): void => {
  const { varName, uuid } = { ...subs };
  if (varName && storeHolder.store[varName]) {
    storeHolder.store[varName].unSubscribe(uuid);
  } else {
    throw new Error(`Store.UnSubscribe: wrong variable '${varName}'`);
  }
};

export const Store = (
  varName: string | null = null,
  val: any = null
): boolean => {
  if (!varName) {
    throw new Error(`Store.Store: wrong variable '${varName}'`);
  } else {
    storeHolder.store[varName] = new storeHolder.storeNode(val);
    return true;
  }
};

export const ClearStore = (): void => {
  storeHolder.store = {};
};
