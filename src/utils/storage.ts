interface Storage {
  localGet(name: string): void;
  localSet(name: string, val: unknown): void;
  localRemove(name: string): void;
  localClear(): void;
  sessionGet(name: string): void;
  sessionSet(name: string, val: unknown): void;
  sessionRemove(name: string): void;
  sessionClear(): void;
}

const storage: Storage = {};

storage.localGet = function (name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch (e) {
    return null;
  }
};

storage.localSet = (name, val) => {
  localStorage.setItem(name, JSON.stringify(val));
};

storage.localRemove = function (name) {
  localStorage.removeItem(name);
};

storage.localClear = function () {
  localStorage.clear();
};

storage.sessionGet = function (name) {
  try {
    return JSON.parse(sessionStorage.getItem(name));
  } catch (e) {
    return null;
  }
};

storage.sessionSet = (name, val) => {
  sessionStorage.setItem(name, JSON.stringify(val));
};

storage.sessionRemove = function (name) {
  sessionStorage.removeItem(name);
};

storage.sessionClear = function () {
  sessionStorage.clear();
};

export default storage;
