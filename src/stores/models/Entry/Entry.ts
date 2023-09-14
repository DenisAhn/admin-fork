import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import {
  IFormEntry,
  IFormFieldOptions,
  SetValueOptions,
} from 'stores/interfaces';
import { ErrorType, getEmptyError, Validator } from 'utils/validators';

type PrivateFields =
  | '_touched'
  | '_value'
  | '_disable'
  | '_required'
  | '_prevValue'
  | '_error';

/** Стор для всех инпутов */
export class Entry<T> implements IFormEntry<T> {
  protected readonly _validator?: Validator<T>;
  protected readonly _defaultValue: T;
  protected readonly _defaultDisable: boolean;
  protected readonly _defaultRequired: boolean;
  private _requiredDisposers: IReactionDisposer[] = [];

  protected _error: ErrorType = getEmptyError();
  protected _touched = false;
  protected _value: T;
  protected _prevValue: T | null = null;
  protected _required = false;
  protected _disable = false;
  constructor({
    defaultValue,
    validator,
    disable = false,
    required = false,
  }: IFormFieldOptions<T>) {
    this._validator = validator;
    this._value = defaultValue;
    this._defaultValue = defaultValue;
    this._disable = disable;
    this._defaultDisable = disable;
    this._required = typeof required === 'function' ? required() : required;
    this._defaultRequired = this._required;

    if (typeof required === 'function') {
      this._requiredDisposers.push(
        reaction(required, (isRequired) => {
          this.setRequired(isRequired);
        })
      );
    }

    makeObservable<Entry<T>, PrivateFields>(this, {
      _value: observable.ref,
      _prevValue: observable.ref,
      _touched: observable,
      _disable: observable,
      _required: observable,
      disable: computed,
      required: computed,
      value: computed,
      prevValue: computed,
      touched: computed,
      error: computed,
      setValue: action.bound,
      reset: action.bound,
      touch: action.bound,
      unTouch: action.bound,
      hasError: computed,
      formFieldView: computed,
      errorIfTouched: computed,
      defaultValue: computed,
      _error: observable.ref,
      setError: action.bound,
    });
  }

  get error(): ErrorType {
    if (this._error.value) {
      return this._error;
    }

    if (this._validator) {
      return this._validator(this.value);
    }

    return getEmptyError();
  }

  get touched(): boolean {
    return this._touched;
  }

  get value(): T {
    return this._value;
  }

  get prevValue(): T | null {
    return this._prevValue;
  }

  get required(): boolean {
    return this._required;
  }

  get disable(): boolean {
    return this._disable;
  }

  get hasError(): boolean {
    return Boolean(this.error.value);
  }

  get defaultValue(): T {
    return this._defaultValue;
  }

  get errorIfTouched(): ErrorType {
    return this.touched ? this.error : getEmptyError();
  }

  get formFieldView(): {
    value: Entry<T>['value'];
    onChange: Entry<T>['setValue'];
    error: Entry<T>['error'];
    onBlur: Entry<T>['touch'];
    important: Entry<T>['required'];
  } {
    return {
      value: this.value,
      onChange: this.setValue,
      error: this.errorIfTouched,
      onBlur: this.touch,
      important: this.required,
    };
  }

  setValue(value: T, options: SetValueOptions = {}): void {
    if (!options.noTouch) {
      this.touch();
    }

    this._error = getEmptyError();
    this._prevValue = this._value;
    this._value = value;
  }

  setError(error: ErrorType): void {
    this._error = error;
  }

  setDisable(value: boolean): void {
    this._disable = value;
  }

  setRequired(value: boolean): void {
    this._required = value;
  }

  destroy(): void {
    this.reset();
    this._requiredDisposers.forEach((d) => d());
  }

  reset(): void {
    this._touched = false;
    this._value = this._defaultValue;
    this._prevValue = null;
    this._disable = this._defaultDisable;
    this._required = this._defaultRequired;
  }

  touch(): void {
    this._touched = true;
  }

  unTouch(): void {
    this._touched = false;
  }
}
