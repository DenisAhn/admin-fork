import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { action, makeObservable, runInAction } from 'mobx';
import queryString from 'query-string';

import { getApiUrl } from 'config/api';
import { ILocalStore } from 'stores/interfaces';
import { TimeoutType } from 'types/utility';

import { MetaStore } from '../MetaStore';

import {
  ApiCallParams,
  BaseResponse,
  RequestParams,
  RequestOptions,
  ApiErrorResponse,
} from './types';

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

type ApiStoreOptions<Data, Params> = {
  /** Таймаут для debounce */
  debounceTimeout?: number;
  /** Функция получение параметров запроса */
  getParams: (params: Params) => RequestParams;
  /** Callback-функция при успешном ответе */
  onSuccess?: (data: Data, params: Params | undefined) => Promise<void> | void;
  /** Callback-функция при ошибке */
  onError?: (error: AxiosError<ApiErrorResponse>) => Promise<void> | void;
};

export class ApiStore<
  Data,
  Params extends Record<string, unknown> = Record<string, unknown>
> implements ILocalStore
{
  private _abortController = new AbortController();
  private readonly _options: ApiStoreOptions<Data, Params>;
  readonly meta = new MetaStore();
  private _timeoutId: TimeoutType | null = null;

  constructor(options: ApiStoreOptions<Data, Params>) {
    this._options = options;

    makeObservable(this, {
      call: action.bound,
    });
  }

  /**
   * Запрос с параметрами
   */
  async call(): Promise<BaseResponse<Data>>;
  async call(params: Params): Promise<BaseResponse<Data>>;
  async call(params?: Params): Promise<BaseResponse<Data>> {
    this.meta.setLoadedStartMeta();
    const { endpoint, method, data, config, multipartFormData } =
      this._options.getParams((params || {}) as Params);

    const response = await this._callApi<Data>({
      endpoint,
      method,
      config: this._configApi({ method, data, config, multipartFormData }),
    });

    if (response.isError) {
      await runInAction(async () => {
        await this._options.onError?.(response.error);
        /* todo: реализовать логаут по истечение жизни токена */
        /* if (response.error.status === 401) {
          rootStore.user.logout();
        }*/
      });

      this.meta.setLoadedErrorMeta();

      return response;
    }

    await runInAction(async () => {
      await this._options.onSuccess?.(response.data, params);
    });

    this.meta.setLoadedSuccessMeta();

    return response;
  }

  /**
   * Вызов с использованием debounce
   */
  async callDebounced(params?: Params): Promise<BaseResponse<Data>> {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    return new Promise((resolve) => {
      this._timeoutId = setTimeout(async () => {
        resolve(this.call(params as Params));
      }, this._options.debounceTimeout || DEFAULT_DEBOUNCE_TIMEOUT);
    });
  }

  private async _callApi<Response>({
    endpoint: url,
    method = 'GET',
    config = {},
  }: ApiCallParams): Promise<BaseResponse<Response>> {
    try {
      const response = await axios({
        url: getApiUrl() + url,
        method,
        ...config,
        signal: this._abortController.signal,
      });

      return {
        isError: false,
        data: response.data,
      };
    } catch (error) {
      return {
        isError: true,
        error: error as AxiosError<ApiErrorResponse>,
      };
    }
  }

  private _configApi({
    method = 'GET',
    data = {},
    config = {},
    multipartFormData = false,
  }: RequestOptions): AxiosRequestConfig {
    const queryConfig = { ...config };

    if (
      (queryConfig.data === null || queryConfig.data === undefined) &&
      method.toUpperCase() !== 'GET'
    ) {
      queryConfig.data = data;
    }

    if (!queryConfig.headers) {
      queryConfig.headers = {};
    }

    if (multipartFormData) {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value as string);
        }
      });
      queryConfig.data = formData;

      Object.assign(queryConfig.headers, {
        'Content-Type': 'multipart/form-data',
      });
    }

    if (method.toUpperCase() === 'GET') {
      queryConfig.params = {
        ...data,
      };

      queryConfig.paramsSerializer = (params) =>
        queryString.stringify(params, { skipNull: true });
    }

    return queryConfig;
  }

  reset(): void {
    this._abortController.abort();
    this.meta.reset();

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this._abortController = new AbortController();
  }

  destroy() {
    this._abortController.abort();

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }
}
