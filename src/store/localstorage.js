const getNameSpace = key => {
  return "sprout." + key;
};

const localStorage = {
  set: (key, value) => window.localStorage.setItem(getNameSpace(key), value),
  get: key => window.localStorage.getItem(getNameSpace(key)),
  remove: key => window.localStorage.removeItem(getNameSpace(key))
};

export const loadState = () => {
  try {
    const serializedState = localStorage.get("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.set("state", serializedState);
  } catch (err) {
    // Ignore for now
  }
};

export default localStorage;