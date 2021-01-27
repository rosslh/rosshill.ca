import { writable as writablePersist } from "svelte-persistent-store/dist/local";

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
