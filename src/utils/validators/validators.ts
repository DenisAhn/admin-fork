import { combineErrors } from './combineErrors';
import { TEXTS_DATA } from './texts';
import { ErrorType, getEmptyError, Validator } from './types';

// Валидирует через все валидаторы и возвращает все ошибки
export const composeValidators =
  <V>(...funcs: Validator<V>[]): Validator<V> =>
  (v: V): ErrorType =>
    funcs.reduce<ErrorType>(
      (acc, validator) => combineErrors(acc, validator(v)),
      getEmptyError()
    );

// Валидирует поочередно и возвращает первую ошибку
export const orderValidators =
  <V>(...funcs: Validator<V>[]): Validator<V> =>
  (v: V): ErrorType => {
    for (const validator of funcs) {
      const result = validator(v);

      if (result.value) {
        return result;
      }
    }

    return getEmptyError();
  };

/**
 * Валидирует строку на предмет того, является ли она валидным email-ом
 * */
export const validateIsEmail =
  <T extends string>(
    errorText: string = TEXTS_DATA.INVALID_EMAIL_FORMAT
  ): Validator<T> =>
  (v?: T | null): ErrorType => {
    const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

    if (!v || !regex.test(v)) {
      return {
        value: true,
        text: [errorText],
      };
    }

    return getEmptyError();
  };

export const validateNotEmpty =
  <T>(errorText: string = TEXTS_DATA.FIELD_REQUIRED): Validator<T> =>
  (v?: T | null): ErrorType => {
    return v === undefined ||
      v === null ||
      !String(v).trim().length ||
      (Array.isArray(v) && v.length === 0)
      ? {
          value: true,
          text: [errorText],
        }
      : getEmptyError();
  };

export const requireIf =
  <T>(
    condition: () => boolean,
    errorText: string = TEXTS_DATA.FIELD_REQUIRED
  ): Validator<T> =>
  (v?: T): ErrorType => {
    if (!condition()) {
      return getEmptyError();
    }

    return validateNotEmpty(errorText)(v);
  };

export const validateIf =
  <T>(
    condition: () => boolean /* условие, при котором мы проходим валидацию*/,
    validator: Validator<T>
  ): Validator<T> =>
  (value: T): ErrorType => {
    if (condition()) {
      return validator(value);
    }

    return { value: false };
  };

export const customValidate =
  <T>(
    condition: (v?: T) => boolean,
    errorText: string = TEXTS_DATA.FIELD_REQUIRED
  ): Validator<T> =>
  (v?: T): ErrorType =>
    !condition(v)
      ? {
          value: true,
          text: [errorText],
        }
      : getEmptyError();
