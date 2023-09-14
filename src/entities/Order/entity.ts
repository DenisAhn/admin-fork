import { Categories } from '../Categories';
import { Services } from '../Services';
import { OrderStatus } from '../Status';
import { UserType } from '../User';

export enum InvoicesRequestKind {
  current = 'current',
  history = 'history',
}

export enum OrderKind {
  archived = 'archived',
  current = 'current',
  all = 'all',
}

export enum PaymentMethod {
  cash = 'cash',
  bankTransfer = 'bankTransfer',
  onlinePayment = 'onlinePayment',
}

export enum OrderPaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid',
}

export type OrderCommonType = {
  category: Categories;
  extra: Record<string, unknown>;
  service: Services;
  id: number;
  provider: string | null;
  photos: string[];
  paid: OrderPaymentStatus;
  price: number | null;
  orderStatus: OrderStatus;
  createdAt: string;
  user: UserType;
  paymentMethod?: PaymentMethod;
};
