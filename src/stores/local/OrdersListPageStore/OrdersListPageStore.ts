import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import { ENDPOINTS } from 'config/endpoints';
import { OrderCommonType } from 'entities/Order';
import { Services } from 'entities/Services';
import { OrderStatus } from 'entities/Status';
import { ILocalStore } from 'stores/interfaces';
import { ApiStore } from 'stores/shared';

export type StatusFilter = OrderStatus | 'all';

export type ServiceFilter = Services | 'all';

const statusToServerFormat = (
  orderStatus?: StatusFilter
): string | undefined => {
  if (!orderStatus || orderStatus === 'all') {
    return undefined;
  }

  return orderStatus;
};

const serviceToServerFormat = (service?: ServiceFilter): string | undefined => {
  if (!service || service === 'all') {
    return undefined;
  }

  return service;
};

type Filters = {
  service: ServiceFilter;
  status: StatusFilter;
};

class OrdersListPageStore implements ILocalStore {
  readonly ordersListRequest = new ApiStore<
    {
      rows: OrderCommonType[];
      count: number;
    },
    Filters
  >({
    getParams: ({ status, service }) => {
      return {
        endpoint: ENDPOINTS.orders.list.url,
        method: 'POST',
        data: {
          status: statusToServerFormat(status),
          service: serviceToServerFormat(service),
        },
      };
    },
    onSuccess: (response) => {
      this._orders = response.rows;
    },
  });

  private _orders: OrderCommonType[] = [];

  private _statusFilter: StatusFilter = 'all';

  private _serviceFilter: ServiceFilter = 'all';

  private _disposers: IReactionDisposer[] = [];

  constructor() {
    makeObservable<
      OrdersListPageStore,
      '_orders' | '_statusFilter' | '_serviceFilter'
    >(this, {
      _orders: observable.ref,
      orders: computed,
      _statusFilter: observable.ref,
      currentStatusFilter: computed,
      setFilterStatus: action.bound,
      _serviceFilter: observable.ref,
      currentServiceFilter: computed,
      setServiceFilter: action.bound,
    });

    this._disposers.push(
      reaction(
        () => this._statusFilter,
        (status) => {
          this.ordersListRequest.call({ ...this.currentFilters, status });
        }
      ),
      reaction(
        () => this._serviceFilter,
        (service) => {
          this.ordersListRequest.call({ ...this.currentFilters, service });
        }
      )
    );
  }

  setFilterStatus(newFilter: StatusFilter): void {
    this._statusFilter = newFilter;
  }

  setServiceFilter(newFilter: ServiceFilter): void {
    this._serviceFilter = newFilter;
  }

  get currentStatusFilter(): StatusFilter {
    return this._statusFilter;
  }

  get currentServiceFilter(): ServiceFilter {
    return this._serviceFilter;
  }

  get orders() {
    return this._orders;
  }

  get currentFilters() {
    return {
      service: this.currentServiceFilter,
      status: this._statusFilter,
    };
  }

  destroy() {
    this.ordersListRequest.destroy();
    this._disposers.forEach((d) => d());
  }
}

export default OrdersListPageStore;
