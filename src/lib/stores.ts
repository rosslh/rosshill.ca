import { writable } from "svelte/store";

const localStore = (localStorageKey: string, callback?: (val: string) => void) => {
  const localStorageEnabled = typeof localStorage !== "undefined" && localStorage;
  const initial = localStorageEnabled ? localStorage.getItem(localStorageKey) : "";
  const { set: setStore, ...store } = writable(initial);
  return {
    ...store,
    set: (value: string) => {
      if (callback) {
        callback(value);
      }
      setStore(value);
      if (localStorageEnabled) {
        localStorage.setItem(localStorageKey, value);
      }
    },
  };
};

export const theme = localStore("user-theme", (value) => document.body.setAttribute("data-theme", value));

export const showCategories = writable([]);
export const showTags = writable([]);

export const cheekyMessagePrinted = writable(false);
