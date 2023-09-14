/** Удаляем указанный ключ из объекта и возвращаем новый объект */
import { AnyObject } from './types';

export const omitKeyImmutable = <
  Obj extends AnyObject = AnyObject,
  K extends keyof Obj = keyof Obj
>(
  object: Obj,
  key: K
): Omit<Obj, typeof key> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: omitted, ...rest } = object;

  return rest;
};
