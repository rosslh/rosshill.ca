import Cookies from "universal-cookie";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { PostCategory, SiteTheme } from "./types";

export const showCategories = writable(new Set<PostCategory>());
export const showTags = writable(new Set<string>());
export const minTagNum = writable(2);

export const consoleMessagePrinted = writable(false);

const cookies = new Cookies();
const yearInSeconds = 60 * 60 * 24 * 365;

function cookieStore<T>(key: string, defaultValue: T = undefined, maxAge = yearInSeconds): Writable<T> {
  const initialValue: T = cookies.get(key) ?? defaultValue;
  const { set: setStore, ...store } = writable(initialValue);
  if (initialValue) {
    cookies.set(key, initialValue, { maxAge });
  }

  return {
    ...store,
    set: (newValue: T) => {
      setStore(newValue);
      cookies.set(key, newValue, { maxAge });
    },
  };
}

export const theme = cookieStore<SiteTheme>("theme", "system");

