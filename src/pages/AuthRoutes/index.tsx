import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthLayout } from 'components/layouts/AuthLayout';
import { APP_ROUTES } from 'config/routes';

import { LoginPage } from './LoginPage';

const AuthPages: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path={APP_ROUTES.auth.login.mask}
          element={
            <React.Suspense>
              <LoginPage />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default React.memo(AuthPages);
