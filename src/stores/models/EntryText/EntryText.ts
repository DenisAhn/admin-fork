import { action, computed, makeObservable } from 'mobx';

import { IFormFieldOptions, IFormModel } from 'stores/interfaces';

import { Entry } from '../Entry';

import { normalizeStringValue } from './utils';

type ToServerData = string | null;

export class EntryText
  extends Entry<string>
  implements IFormModel<any, ToServerData>
{
  constructor(options?: Partial<IFormFieldOptions<string>>) {
    super({ ...options, defaultValue: options?.defaultValue || '' });

    makeObservable<EntryText>(this, {
      toServerFormat: computed,
      fromServerFormat: action,
    });
  }

  /**
   * Возвращает серверный формат значение поле
   * @returns {ToServerData} результат для отправки на сервер
   */
  get toServerFormat(): ToServerData {
    return this.value !== null ? this.value : null;
  }

  /**
   * Заполняет значение поле из серверных данных
   * @param from серверные данные
   */
  fromServerFormat<T>(from: T): void {
    this.setValue(normalizeStringValue(from), { noTouch: true });
    this.unTouch();
  }
}
