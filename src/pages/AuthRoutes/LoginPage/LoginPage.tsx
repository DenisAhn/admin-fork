import { Stack, Typography, Link } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { APP_ROUTES } from 'config/routes';

import { AuthLoginForm } from './AuthLoginForm';

const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <Stack spacing={2} sx={{ mb: 5, mt: -12, position: 'relative' }}>
        <Typography variant="h4">Sign in to Homy Assistant</Typography>
      </Stack>
      <AuthLoginForm />
      <Stack spacing={1} sx={{ mt: 1 }}>
        <Typography
          component="div"
          sx={{
            color: 'text.secondary',
            mt: 1,
            typography: 'caption',
            textAlign: 'center',
          }}
        >
          Don`t have an account?{' '}
          <Link
            component={RouterLink}
            to={APP_ROUTES.auth.register.createRoute()}
            variant="subtitle2"
          >
            Sign up
          </Link>
        </Typography>
      </Stack>
    </React.Fragment>
  );
};

export default React.memo(LoginPage);
