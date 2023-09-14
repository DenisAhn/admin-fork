import { action, computed, makeObservable, observable } from 'mobx';

import { ToggleState } from 'hooks/useToggleState';
import { ILocalStore } from 'stores/interfaces';

type PrivateFields = '_opened' | '_disabled';

type ToggleStateStoreParams = {
  defaultValue: boolean;
};

const TOGGLE_STATE_DEFAULT_PARAMS: ToggleStateStoreParams = {
  defaultValue: false,
};

class ToggleStateStore implements ToggleState, ILocalStore {
  private _opened: boolean;
  private _disabled = false;
  constructor(params: ToggleStateStoreParams = TOGGLE_STATE_DEFAULT_PARAMS) {
    this._opened = params.defaultValue;

    makeObservable<ToggleStateStore, PrivateFields>(this, {
      _opened: observable.ref,
      close: action.bound,
      open: action.bound,
      toggle: action.bound,
      opened: computed,

      _disabled: observable.ref,
      disable: action.bound,
      enable: action.bound,
    });
  }

  get opened(): boolean {
    return this._opened;
  }

  get disabled() {
    return this._disabled;
  }

  disable(): void {
    this._disabled = true;
  }

  enable(): void {
    this._disabled = false;
  }

  close(): void {
    this._opened = false;
  }

  open(): void {
    this._opened = true;
  }

  toggle(): void {
    this._opened = !this._opened;
  }

  destroy() {}
}

export default ToggleStateStore;
