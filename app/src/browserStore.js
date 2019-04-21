const getStorage = isPersistent => (
  isPersistent ? localStorage : sessionStorage
);

const selectStorage = (key, isPersistent = undefined) => {
  // If the user specified which storage they want, give it to them
  if (isPersistent !== undefined) {
    return getStorage(isPersistent);
  }

  // Otherwise, look in the persistent storage first
  const fromPersistent = getStorage(true).getItem(key);

  // If it's not there, give them the non-persistent storage
  if (fromPersistent === null) {
    return getStorage(false);
  }

  // Otherwise return the persistent storage
  return getStorage(true);
};

export default {
  /**
   * Inserts a key-value pair into the browser store, either in localStorage if
   * isPersistent is true or sessionStorage otherwise.
   * @param {*} key the unique key to identify this item
   * @param {*} value the value to be saved in the browser storage
   * @param {*} isPersistent whether the item should persist across browser restarts
   */
  insert(key, value, isPersistent = true) {
    getStorage(isPersistent).setItem(key, value);
  },

  /**
   * Retrieves the value associated with the specified key from the browser storage.
   * If isPersistent is passed, this function will look in the specified storage
   * exclusively; otherwise, it first tries to retrieve it from the persistent storage
   * and then falls back to the non-persistent storage if it's not there.
   * @param {*} key the identifier of the value to be retrieved
   * @param {*} isPersistent whether to look in the local, session or both storages (if undefined)
   */
  find(key, isPersistent = undefined) {
    return selectStorage(key, isPersistent).getItem(key);
  },

  /**
   * Removes the key and its associated value from the browser storage. Behaves similarly
   * to the find() function with respect to the isPersistent parameter.
   * @param {*} key the identifier of the value to be removed
   * @param {*} isPersistent whether to look in the local, session or both storages (if undefined)
   */
  remove(key, isPersistent = undefined) {
    return selectStorage(key, isPersistent).removeItem(key);
  },

  /**
   * Removes the key from both storages, annihilating it from existence.
   * @param {*} key the identifier of the value to be obliterated
   */
  exterminate(key) {
    getStorage(true).removeItem(key);
    getStorage(false).removeItem(key);
  },
};
