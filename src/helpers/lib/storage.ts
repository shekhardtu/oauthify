const storage = {
  prefix: "@dp",
};

export const session = (
  key?: string,
  value?: string,
  prefix: string = storage?.prefix || "@dp"
) => {
  return {
    get: (key: string) => {
      const item = window.sessionStorage.getItem(`${prefix}::${key}`);
      return item ? JSON.parse(item) : item;
    },
    set: (key: string, value: any) =>
      window.sessionStorage.setItem(`${prefix}::${key}`, JSON.stringify(value)),
    remove: (key: string) =>
      window.sessionStorage.removeItem(`${prefix}::${key}`),
    clear: () => window.sessionStorage.clear(),
  };
};

export const local = (
  key?: string,
  value?: string,
  prefix: string = storage?.prefix || "@dp"
) => {
  return {
    get: (key: string) => {
      const item = window.localStorage.getItem(`${prefix}::${key}`);
      return item ? JSON.parse(item) : item;
    },
    set: (key: string, value: any) =>
      window.localStorage.setItem(`${prefix}::${key}`, JSON.stringify(value)),
    remove: (key: string) =>
      window.localStorage.removeItem(`${prefix}::${key}`),
    clear: () => window.localStorage.clear(),
  };
};


export const generateUUID = () => {
  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
};