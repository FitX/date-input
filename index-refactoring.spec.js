import {
  getDateByLanguage,
  useDateInput,
} from './index-refactoring';

const dates = {
  de: '11.08.1984',
  deShort: '1.2.3456',
  deShortFilled: '01.02.3456',
};

test('getDateByLanguage without date String should throw an error', () => {
  expect(getDateByLanguage).toThrow(Error);
  expect(getDateByLanguage).toThrow('dateString is Required');
});

/* test('getDateByLanguage with unsupported language should throw an error', () => {
  expect(getDateByLanguage(dates.de, 'Blubb')).toThrow(Error);
  expect(getDateByLanguage(dates.de, 'Blubb')).toBe('is not a supported Language');
}); */

test('getDateByLanguage should get Date Input Object', () => {
  expect(getDateByLanguage(dates.de)).toEqual(
    expect.objectContaining({
      day: '11',
      month: '08',
      year: '1984',
    })
  );
  expect(getDateByLanguage(dates.deShort)).toEqual(
    expect.objectContaining({
      day: '01',
      month: '02',
      year: '3456',
    })
  );
});

test('input validation should be correctly initialized', () => {
  const {
    inputValidation,
  } = useDateInput();
  expect(inputValidation.dayIsValid).toBe(false);
  expect(inputValidation.monthValid).toBe(false);
  expect(inputValidation.yearIsValid).toBe(false);
});

test('complete date in correct format should be validated', () => {
  const {
    handleInput,
    inputValidation,
  } = useDateInput();
  expect(handleInput(dates.de)).toBe(dates.de);
});

test('input should works', () => {
  const {
    handleInput,
    inputValidation,
  } = useDateInput();
  expect(handleInput('1')).toBe('1');
  expect(handleInput('11')).toBe('11.');
  expect(handleInput('11.')).toBe('11.');
  expect(handleInput('11.0')).toBe('11.0');
  expect(handleInput('11.08')).toBe('11.08.');
  expect(handleInput('11.08.')).toBe('11.08.');
  expect(handleInput('11.08.1')).toBe('11.08.1');
  expect(handleInput('11.08.19')).toBe('11.08.19');
  expect(handleInput('11.08.198')).toBe('11.08.198');
  expect(handleInput('11.08.1984')).toBe('11.08.1984');
});

test('input without zero should set delimiter automatically', () => {
  const {
    handleInput,
  } = useDateInput();
  expect(handleInput('1.')).toBe('01.');
  expect(handleInput('01.11')).toBe('01.11.');
});

test('input with zero should set delimiter automatically', () => {
  const {
    handleInput,
  } = useDateInput();
  expect(handleInput('01')).toBe('01.');
  expect(handleInput('01.02')).toBe('01.02.');
});

test('complete dates should be work', () => {
  const {
    handleInput,
  } = useDateInput();
  expect(handleInput(dates.deShort)).toBe(dates.deShortFilled);
  expect(handleInput(dates.de)).toBe(dates.de);
});
