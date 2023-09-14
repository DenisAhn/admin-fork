import { StringLikeValues } from 'types/stringLike';

export type SelectOptionEntity<V extends StringLikeValues = string> = {
  id: string | number;
  label?: string;
  value: V;
};
