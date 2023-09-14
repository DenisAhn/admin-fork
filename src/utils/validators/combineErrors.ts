import { ErrorType } from './types';

/**
 * text: undefined -> []
 * text: 'value' -> ['value']
 * text: ['value1', 'value2'] -> ['value1', 'value2']
 * @param err
 */
const getTextArr = (err: ErrorType): string[] =>
  err.value && err.text
    ? Array.isArray(err.text)
      ? err.text
      : [err.text]
    : [];

export const combineErrors = (a: ErrorType, b: ErrorType): ErrorType => {
  if (!a.value) {
    return b;
  }

  if (!b.value) {
    return a;
  }

  return {
    value: true,
    text: [...getTextArr(a), ...getTextArr(b)],
  };
};
