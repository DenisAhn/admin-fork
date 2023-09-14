import { ENDPOINTS } from 'config/endpoints';
import { userStore } from 'stores/global/UserStore';
import { ILocalStore } from 'stores/interfaces';
import { EntryText } from 'stores/models';
import { Form } from 'stores/models/Form';
import { ApiStore } from 'stores/shared';
import {
  composeValidators,
  validateIsEmail,
  validateNotEmpty,
} from 'utils/validators';

type Fields = {
  email: EntryText;
  password: EntryText;
};

class LoginPageStore implements ILocalStore {
  readonly loginRequest = new ApiStore<unknown>({
    getParams: () => ({
      endpoint: ENDPOINTS.auth.login.url,
      method: 'POST',
      data: {
        email: this.form.fields.email.toServerFormat,
        password: this.form.fields.password.toServerFormat,
      },
    }),
    onSuccess: userStore.getCurrent,
    onError: () => {},
  });

  readonly form = new Form<Fields>({
    email: new EntryText({
      defaultValue: '',
      validator: composeValidators(
        validateNotEmpty('Enter email'),
        validateIsEmail('Enter valid email')
      ),
    }),
    password: new EntryText({
      defaultValue: '',
      validator: validateNotEmpty('Enter password'),
    }),
  });

  login = async () => {
    this.form.validate();

    if (!this.form.canSubmit) {
      return;
    }

    await this.loginRequest.call();
  };

  destroy() {
    this.loginRequest.destroy();
  }
}

export default LoginPageStore;
