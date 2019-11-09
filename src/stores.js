import { writable } from "svelte-persistent-store/local";

export const theme = writable("user-theme", "");
