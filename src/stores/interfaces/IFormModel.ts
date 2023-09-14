import { IServerEntity } from './IServerEntity';
import { IWithError } from './IWithError';

export interface IFormModel<FromServerT, ToServerT>
  extends IWithError,
    IServerEntity<ToServerT> {
  fromServerFormat(from: FromServerT): void;
}
