import { action, makeObservable, observable } from 'mobx';

import { ENDPOINTS } from 'config/endpoints';
import { ApiStore } from 'stores/shared';
import { UserEntity } from 'types/entities/User';

import { IUserStore } from './types';

class UserStore implements IUserStore {
  readonly userCurrentRequest = new ApiStore<UserEntity>({
    getParams: () => ({
      endpoint: ENDPOINTS.user.current.url,
      method: 'GET',
    }),
    onSuccess: (result) => {
      this.user = result;
    },
  });

  user: UserEntity | null = null;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      logout: action.bound,
      getCurrent: action.bound,
    });
  }

  async login(): Promise<void> {}
  async logout(): Promise<void> {
    this.user = null;
  }

  async init(): Promise<void> {}

  async getCurrent(): Promise<void> {
    await this.userCurrentRequest.call();
  }
}

export default UserStore;
