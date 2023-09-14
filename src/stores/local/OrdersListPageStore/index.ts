import { createContextLocalStore } from '../createContextLocalStore';

import OrdersListPageStore from './OrdersListPageStore';

const { Provider, useStore } = createContextLocalStore(OrdersListPageStore);

export {
  Provider as OrdersListPageStoreProvider,
  useStore as useOrdersListPageStore,
  OrdersListPageStore,
};
