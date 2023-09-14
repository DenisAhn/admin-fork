import { LoadingButton } from '@mui/lab';
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { FormInputField } from 'components/shared/FormInputField';
import { Iconify } from 'components/ui/Iconify';
import { useLocalStore } from 'hooks/';
import { LoginPageStore } from 'stores/local/LoginPageStore';

function AuthLoginForm() {
  const { form, loginRequest, login } = useLocalStore(
    () => new LoginPageStore()
  );

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <React.Fragment>
      <Stack spacing={3}>
        {loginRequest.meta.isError && (
          <Alert severity="error">
            Error occurred during login. Try again!
          </Alert>
        )}

        <FormInputField
          model={form.fields.email}
          name="email"
          label="Email address"
        />

        <FormInputField
          model={form.fields.password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={login}
        sx={{
          my: 2,
          bgcolor: 'primary',
          color: (theme) =>
            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          '&:hover': {
            bgcolor: 'primary',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          },
        }}
      >
        Login
      </LoadingButton>
    </React.Fragment>
  );
}

export default observer(AuthLoginForm);
