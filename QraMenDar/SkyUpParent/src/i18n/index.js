import i18n from 'i18n-js';
import fr from './fr.json';

import {NativeModules} from 'react-native';
let currentLanguageCode = null;
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  fr: fr,
};

var flags = {
  en: require('../../assets/language/United-Kingdom.png'),
  fr: require('../../assets/language/France.png'),
  es: require('../../assets/language/Spain.png'),
  it: require('../../assets/language/Italie.png'),
  ja: require('../../assets/language/Japanese.png'),
};
// Set the locale once at the beginning of your app.
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

async function init() {
  setLanguageCode('fr');
}

export async function setLanguageCode(arg, flag) {
  // if (!i18n.translations[arg]) {
  //   throw new Error(`Invalid language ${arg}.`);
  // }
  AsyncStorage.setItem('i18n', arg);
  i18n.locale = arg;
  if (flag) {
    NativeModules.DevSettings.reload();
  }
  let newlang = await getCurrentLanguage();

  //await Updates.reloadAsync();
}
export async function getCurrentLanguage() {
  return 'fr';
}

export function getLanguageCode() {
  if (!currentLanguageCode) {
    init();
  }

  return currentLanguageCode;
}

export function getFlags(arg) {
  return flags[arg];
}

let data = getLanguageCode();
export default i18n;
