import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { withAuth } from 'components/hocs/withAuth';
import { withoutAuth } from 'components/hocs/withoutAuth';
import { APP_ROUTES } from 'config/routes';
import { ThemeProvider } from 'styles/theme';

const AppRoutes = withAuth(React.lazy(() => import('../AppRoutes')));

const AuthRoutes = withoutAuth(React.lazy(() => import('../AuthRoutes')));

const RootPage: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.root}>
            <Route path={APP_ROUTES.auth.mask} element={<AuthRoutes />} />
            <Route path={APP_ROUTES.app.mask} element={<AppRoutes />} />
            <Route
              index
              element={<Navigate to={APP_ROUTES.app.createRoute()} />}
            />
            <Route
              path="*"
              element={<Navigate to={APP_ROUTES.root} replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default RootPage;
