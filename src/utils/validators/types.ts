export type ErrorType = {
  value?: boolean;
  text?: string | string[];
};

export const getEmptyError = (): ErrorType => {
  return { value: false };
};

export type Validator<V> = (v: V) => ErrorType;
