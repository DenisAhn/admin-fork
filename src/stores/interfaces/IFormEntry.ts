import { Validator, ErrorType } from 'utils/validators';

import { ILocalStore } from './ILocalStore';
import { IWithError } from './IWithError';

export type SetValueOptions = {
  noTouch?: boolean;
};

export interface IFormEntry<T> extends IWithError, ILocalStore {
  value: T;
  error: ErrorType;
  hasError: boolean;
  errorIfTouched: ErrorType;
  touched: boolean;
  required: boolean;
  setValue(value: T, options?: SetValueOptions): void;
  reset(): void;
  touch(): void;
}

export interface IFormFieldOptions<T> {
  defaultValue: T;
  validator?: Validator<T>;
  disable?: boolean;
  required?: boolean | (() => boolean);
}
