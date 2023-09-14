import { action, computed, makeObservable, observable } from 'mobx';

import { ILocalStore } from 'stores/interfaces';
import { noop } from 'utils/noop';

import {
  getInitialMetaState,
  getLoadedErrorMeta,
  getLoadedSuccessMeta,
  getLoadingStartMeta,
  isInitialMetaState,
  Meta,
} from './types';

/**
 * Mobx класс для флажков isLoading и isError, Возможно потом будет расширяться
 * */
export class MetaStore implements ILocalStore {
  data: Meta;

  destroy = noop;
  constructor(meta?: Meta) {
    this.data = meta || getInitialMetaState();

    makeObservable<MetaStore>(this, {
      data: observable.ref,
      isLoading: computed,
      isError: computed,
      isLoaded: computed,
      isInitialMetaState: computed,
      setLoadedStartMeta: action.bound,
      setLoadedSuccessMeta: action.bound,
      setLoadedErrorMeta: action.bound,
      reset: action.bound,
    });
  }

  static merge = (...items: MetaStore[]): MetaStore => {
    let data = getInitialMetaState();

    if (items.some((item) => item.isError)) {
      data = getLoadedErrorMeta();
    }

    if (items.some((item) => item.isLoading)) {
      data = getLoadingStartMeta();
    }

    if (items.every((item) => item.isLoaded)) {
      data = getLoadedSuccessMeta();
    }

    return new MetaStore(data);
  };

  get isLoading(): boolean {
    return this.data.isLoading;
  }

  get isError(): boolean {
    return this.data.isError;
  }

  get isInitialMetaState(): boolean {
    return isInitialMetaState(this.data);
  }

  get isLoaded(): boolean {
    return this.data.isLoaded;
  }

  reset(): void {
    this.data = getInitialMetaState();
  }

  setLoadedStartMeta(): void {
    this.data = getLoadingStartMeta();
  }

  setLoadedSuccessMeta(): void {
    this.data = getLoadedSuccessMeta();
  }

  setLoadedErrorMeta(): void {
    this.data = getLoadedErrorMeta();
  }
}
