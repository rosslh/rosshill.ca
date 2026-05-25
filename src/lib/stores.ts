import Cookies from "universal-cookie";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { normalizeSiteTheme, SiteTheme } from "./types";

const cookies = new Cookies();
const yearInSeconds = 60 * 60 * 24 * 365;

function cookieStore<T>(
  key: string,
  defaultValue: T,
  normalizeValue: (value: unknown) => T,
  maxAge = yearInSeconds,
): Writable<T> {
  const initialValue = normalizeValue(cookies.get(key) ?? defaultValue);
  const { set: setStore, ...store } = writable(initialValue);
  if (initialValue) {
    cookies.set(key, initialValue, { maxAge });
  }

  return {
    ...store,
    set: (newValue: T): void => {
      setStore(newValue);
      cookies.set(key, newValue, { maxAge });
    },
  };
}

export const themeStore = cookieStore(
  "theme",
  SiteTheme.Auto,
  normalizeSiteTheme,
);
