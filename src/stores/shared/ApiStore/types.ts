import { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { AnyObject } from 'types/utility';

export type RequestOptions = {
  method?: Method;
  data?: AnyObject;
  config?: AxiosRequestConfig;
  multipartFormData?: boolean;
};

export type RequestParams = {
  endpoint: string;
} & RequestOptions;

export type ApiCallParams = Omit<RequestParams, 'data' | 'multipartFormData'>;

export type ApiErrorStatus = 'duplicated_year_error' | string;

export type ApiErrorResponse = {
  message: string;
  status: ApiErrorStatus;
};

export type BaseResponse<Data> =
  | {
      isError: false;
      data: Data;
    }
  | {
      isError: true;
      error: AxiosError<ApiErrorResponse>;
    };
