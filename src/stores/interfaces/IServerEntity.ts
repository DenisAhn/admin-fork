/**
 * Интерфейс с функцией для нормализации к серверным данным
 */
export interface IServerEntity<ToServerT> {
  readonly toServerFormat: ToServerT;
}
