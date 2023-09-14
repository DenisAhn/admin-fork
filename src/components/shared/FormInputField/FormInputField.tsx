import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { EntryText } from 'stores/models';

export type FormInputFieldProps = {
  model: EntryText;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

const FormInputField: React.FC<FormInputFieldProps> = ({ model, ...props }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      ({ target }) => {
        model.setValue(target.value);
      },
      [model]
    );

  return (
    <TextField
      {...props}
      onChange={handleChange}
      value={model.value || ''}
      error={model.hasError}
    />
  );
};

export default observer(FormInputField);
