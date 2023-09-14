export type StepValidatorBase = {
  state: ValidatorState;
  label: string;
};

export enum ValidatorState {
  untouched = 'untouched',
  error = 'error',
  success = 'success',
}
