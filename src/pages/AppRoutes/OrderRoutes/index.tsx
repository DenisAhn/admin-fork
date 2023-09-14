import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useLocalStore } from 'hooks/';
import {
  OrdersListPageStore,
  OrdersListPageStoreProvider,
} from 'stores/local/OrdersListPageStore';

import { OrderList } from './OrderList';

const OrderRoutes: React.FC = () => {
  const ordersListPage = useLocalStore(() => new OrdersListPageStore());

  return (
    <Routes>
      <Route>
        <Route
          index
          element={
            <React.Suspense>
              <OrdersListPageStoreProvider store={ordersListPage}>
                <OrderList />
              </OrdersListPageStoreProvider>
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default observer(OrderRoutes);
