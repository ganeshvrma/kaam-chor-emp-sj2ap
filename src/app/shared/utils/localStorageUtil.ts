// src/app/shared/utils/localStorageUtil.ts

export const LocalStorageUtil = {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem(key: string) {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return value;
    }
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
