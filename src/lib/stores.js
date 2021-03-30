import { writable } from "svelte/store";

const storageKey = "user-theme";
const localStorageEnabled = typeof localStorage !== "undefined" && localStorage;

const themeStore = initial => {
  const { set: setStore, ...store } = writable(initial);
  return {
    ...store,
    set: value => {
      document.body.setAttribute("data-theme", value);
      setStore(value);
      if (localStorageEnabled) {
        localStorage.setItem(storageKey, value);
      }
    }
  };
};

export const theme = themeStore(localStorageEnabled ? localStorage.getItem(storageKey) : "");
