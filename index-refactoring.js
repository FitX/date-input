/**
 * @typedef {object} DateObject
 * @property {string|null} day e.g. '1' or '11'
 * @property {string|null} month e.g. '2' or '12'
 * @property {string|null} year e.g. '2021'
 * @property {string|null} delimiterDay Example for German: '.'
 * @property {string|null} delimiterMonth Example for English: '/'
 * @property {string|null} delimiterYear Example for Mandarin: '年'
 */

/**
 * @typedef {'de'} SupportedLanguages
 */

/**
 * List of Supported Languages
 * @type {SupportedLanguages[]}
 */
const SUPPORTED_LANGUAGES = ['de'];
const updateLeadingZero = (numberAsString) => numberAsString?.padStart(2, '0');

const removeUndefinedFromObject = (obj) => Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);

/**
 * Get Date Information as Object by String
 * @param {string} dateString e.g. '11.08.1984'
 * @param {SupportedLanguages} lang e.g 'de'
 * @return {DateObject}
 */
export const getDateByLanguage = (dateString, lang = 'de') => {
  if (!dateString) throw new Error('dateString is Required');
  if (!SUPPORTED_LANGUAGES.includes(lang)) throw new Error(`${lang} is not a supported Language`);
  const dateObject = {
    day: '',
    month: '',
    year: '',
    delimiterDay: '',
    delimiterMonth: '',
    delimiterYear: '',
  };
  switch(lang) {
    case 'de':
      const delimiter = '.';
      const parts = dateString.split(delimiter);
      /**
       * Leading Zero only if . found
       */
      dateObject.day = parts.length > 1 ? updateLeadingZero(parts[0]) : parts[0];
      dateObject.month = parts.length > 2 ? updateLeadingZero(parts[1]) : parts[1];
      dateObject.year = parts[2];
      dateObject.delimiterDay = delimiter;
      dateObject.delimiterMonth = delimiter;
      break;
    // no default
  }
  return dateObject;
};

/**
 * Get Output Format as String
 * @param {DateObject} dateObject
 * @param {SupportedLanguages} lang
 * @return {string} DateString by Language
 */
export const formatDateByObject = (dateObject, setDelimiter = false, lang = 'de') => {
  if (!dateObject) throw new Error('dateObject is Required');
  if (!SUPPORTED_LANGUAGES.includes(lang)) throw new Error(`${lang} is not a supported Language`);
  switch(lang) {
    case 'de':
      const {
        day = '',
        month = '',
        year = '',
        delimiterDay,
        delimiterMonth,
      } = dateObject;
      const dayFullFilled = day?.length === 2;
      const monthFullFilled = month?.length === 2;
      if (monthFullFilled) return `${day}${delimiterDay}${month}${delimiterMonth}${year}`;
      if (dayFullFilled) return `${day}${delimiterDay}${month}`;
      return day;
    // no default
  }
  return '';
}
/**
 * Date Input helper for German Date Format 'TT.MM.YYYY'
 * @return {{handleInput: (function(*=): string), prevValue: string}}
 */
export const useDateInput = ({ lang = 'de'} = {}) => {
  let prevValue = '';
  const inputValidation = {
    dayIsValid: false,
    monthValid: false,
    yearIsValid: false,
  }
  const handleInput = (value) => {
    let newVal = value || '';
    const hasNewCharacter = prevValue.length < newVal.length;
    const dateObject = getDateByLanguage(value, lang);
    console.log('value input', value);
    console.log('dateObject', dateObject);
    // Get Format only by new Character
    if (hasNewCharacter) {
      newVal = formatDateByObject(dateObject, lang);
    } else {
      newVal = value;
    }
    prevValue = newVal;
    return newVal;
  };
  return {
    inputValidation,
    handleInput,
  }
}
