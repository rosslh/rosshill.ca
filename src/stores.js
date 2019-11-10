import { writable } from "svelte-persistent-store/local";

const themeStore = initial => {
  const { set: setStore, ...store } = writable("user-theme", initial);
  return {
    ...store,
    set: value => {
      document.body.setAttribute("data-theme", value);
      setStore(value);
    }
  };
};

export const theme = themeStore("");
