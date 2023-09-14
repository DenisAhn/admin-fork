import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from 'components/layouts/AppLayout';
import { APP_ROUTES } from 'config/routes';

import OrderRoutes from './OrderRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.app.orders.mask} element={<OrderRoutes />} />
        <Route
          index
          element={<Navigate to={APP_ROUTES.app.orders.createRoute()} />}
        />
      </Route>
    </Routes>
  );
};

export default React.memo(AppRoutes);
