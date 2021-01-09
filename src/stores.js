import { writable as writablePersist } from "svelte-persistent-store/local";
import { writable } from "svelte/store";

const themeStore = initial => {
  const { set: setStore, ...store } = writablePersist("user-theme", initial);
  return {
    ...store,
    set: value => {
      document.body.setAttribute("data-theme", value);
      setStore(value);
    }
  };
};

export const theme = themeStore("");

export const logoTransitionDisabled = writable(false);
