export interface IUserStore {
  logout: () => Promise<void>;
  login: () => Promise<void>;
  init: () => Promise<void>;
}
