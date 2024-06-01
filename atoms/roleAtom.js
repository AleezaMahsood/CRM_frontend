import { atom } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(savedValue);
    }
  
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue);
    });
  };

export const roleState = atom({
    key: 'userRole', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
    effects: [
        localStorageEffect('userRole'),
    ]
});