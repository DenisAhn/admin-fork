import { ILocalStore } from 'stores/interfaces';
import { Entry } from 'stores/models';

class Form<Fields extends Record<string, Entry<any>>> implements ILocalStore {
  private readonly _fields: Fields;

  constructor(fields: Fields) {
    this._fields = fields;
  }

  get fields(): Fields {
    return this._fields;
  }

  get canSubmit(): boolean {
    return !this._formsFlat.some((field) => field.hasError);
  }

  private get _formsFlat(): Entry<any>[] {
    return Object.values(this._fields);
  }

  reset(): void {
    this._formsFlat.forEach((item) => item.unTouch());
  }

  validate(): void {
    this._formsFlat.forEach((field) => field.touch());
  }

  destroy() {
    this.reset();
  }
}

export default Form;
