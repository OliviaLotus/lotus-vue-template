import { useLocalStorage, useSessionStorage } from "@vueuse/core";

export function storageLocal<T>(
  key: string,
  value?: T | null
): T | undefined | void {
  if (value === undefined) {
    return useLocalStorage<T | undefined>(key, undefined).value;
  }

  if (value === null) {
    // 如果 value 是 null，删除 localStorage 中的键
    useLocalStorage<T | undefined>(key, undefined).value = undefined;
  } else {
    // 否则，设置值
    useLocalStorage<T | undefined>(key, undefined).value = value;
  }
}

export function storageSession<T>(
  key: string,
  value?: T | null
): T | undefined | void {
  if (value === undefined) {
    return useSessionStorage<T | undefined>(key, undefined).value;
  }

  if (value === null) {
    // 如果 value 是 null，删除 sessionStorage 中的键
    useSessionStorage<T | undefined>(key, undefined).value = undefined;
  } else {
    // 否则，设置值
    useSessionStorage<T | undefined>(key, undefined).value = value;
  }
}

export function localStorageClear() {
  localStorage.clear();
}
