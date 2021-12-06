/**
 * Svelte Demo: @link https://svelte.dev/repl/a4a95ad06d1f4714882e76c56604b84f?version=3.44.2
 */

/**
 * @typedef {'1','2','3','4','5','6','7','8','9','0','.'} AllowedKeys
 */

/**
 * Allowed Input Keys
 * @type {AllowedKeys[]}
 */
export const allowedKeys = [
  '1','2','3','4','5','6','7','8','9','0','.',
];

/**
 * Date Input helper for German Date Format 'TT.MM.YYYY'
 * @return {{handleInput: (function(*=): string), prevValue: string}}
 */
export const useDateInput = () => {
  let prevValue = '';
  /**
   * Handle Form Input
   * @param {AllowedKeys} value
   * @return {string}
   */
  const handleInput = (value) => {
    let newVal = value || '';
    if (prevValue.length < newVal.length) {
      const newChar = newVal.slice(newVal.length - 1);
      if (allowedKeys.indexOf(newChar) === -1) {
        console.log('delete');
        newVal = newVal.slice(0, newVal.length - 1);
      } else {
        if (newChar === '.') {
          switch(newVal.length) {
            case 2:
              newVal = `0${newVal}`;
              break;
            case 5:
              newVal = `${newVal.slice(0,3)}0${newVal.slice(newVal.length-2)}`;
              break;
            case 3:
            case 6:
              // Case for 1.. @TODO need?
              break;
            default:
              newVal = newVal.slice(0, newVal.length - 1);
              break;
          }
        } else {
          switch (newVal.length) {
            case 2:
            case 5:
              newVal = `${newVal}.`;
              break;
            case 3:
            case 6:
              console.log('case 3 6',
                newVal,
                newChar,
                 `${newVal.slice(0, newVal.length -1)}.${newChar}`,
              );
              newVal = `${newVal.slice(0, newVal.length -1)}.${newChar}`;
              break;
          }
        }
      }
    }
    newVal = newVal.slice(0, 10);
    prevValue = newVal;
    console.log('prevValue', prevValue);
    return newVal;
  }
  return {
    // prevValue,
    handleInput,
  }
}
