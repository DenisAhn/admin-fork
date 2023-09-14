import { OrderCommonType } from 'entities/Order';
import {
  MAP_STATUS_TO_COLOR,
  ORDER_STATUS_TEXT_MAPPER,
  OrderStatus,
} from 'entities/Status';

export const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'user', label: 'User', align: 'center' },
  { id: 'createdDate', label: 'Create', align: 'center' },
  { id: 'category', label: 'Category', align: 'center', width: 140 },
  { id: 'service', label: 'Service', align: 'center', width: 140 },
  { id: 'provider', label: 'Provider', align: 'center' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
];

export const getTabs: (
  getLengthByStatus: (status: string) => number,
  orders: OrderCommonType[]
) => {
  value: OrderStatus | 'all';
  label: string;
  color: { title: string; background: string };
  count: number;
}[] = (getLengthByStatus, orders) => [
  {
    value: 'all',
    label: 'All',
    color: {
      title: '#000',
      background: '#fff',
    },
    count: orders.length,
  },
  {
    value: OrderStatus.pending,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.pending],
    color: MAP_STATUS_TO_COLOR[OrderStatus.pending],
    count: getLengthByStatus(OrderStatus.pending),
  },
  {
    value: OrderStatus.awaitsPayment,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.awaitsPayment],
    color: MAP_STATUS_TO_COLOR[OrderStatus.awaitsPayment],
    count: getLengthByStatus(OrderStatus.awaitsPayment),
  },
  {
    value: OrderStatus.paused,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.paused],
    color: MAP_STATUS_TO_COLOR[OrderStatus.paused],
    count: getLengthByStatus(OrderStatus.paused),
  },
  {
    value: OrderStatus.awaitsConfirmation,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.awaitsConfirmation],
    color: MAP_STATUS_TO_COLOR[OrderStatus.awaitsConfirmation],
    count: getLengthByStatus(OrderStatus.awaitsConfirmation),
  },
  {
    value: OrderStatus.paid,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.paid],
    color: MAP_STATUS_TO_COLOR[OrderStatus.paid],
    count: getLengthByStatus(OrderStatus.paid),
  },
  {
    value: OrderStatus.inProgress,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.inProgress],
    color: MAP_STATUS_TO_COLOR[OrderStatus.inProgress],
    count: getLengthByStatus(OrderStatus.inProgress),
  },
  {
    value: OrderStatus.rejected,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.rejected],
    color: MAP_STATUS_TO_COLOR[OrderStatus.rejected],
    count: getLengthByStatus(OrderStatus.rejected),
  },
  {
    value: OrderStatus.archived,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.archived],
    color: MAP_STATUS_TO_COLOR[OrderStatus.archived],
    count: getLengthByStatus(OrderStatus.archived),
  },
  {
    value: OrderStatus.awaitsPostPayment,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.awaitsPostPayment],
    color: MAP_STATUS_TO_COLOR[OrderStatus.awaitsPostPayment],
    count: getLengthByStatus(OrderStatus.awaitsPostPayment),
  },
  {
    value: OrderStatus.cancelled,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.cancelled],
    color: MAP_STATUS_TO_COLOR[OrderStatus.cancelled],
    count: getLengthByStatus(OrderStatus.cancelled),
  },
  {
    value: OrderStatus.hasIssues,
    label: ORDER_STATUS_TEXT_MAPPER[OrderStatus.hasIssues],
    color: MAP_STATUS_TO_COLOR[OrderStatus.hasIssues],
    count: getLengthByStatus(OrderStatus.hasIssues),
  },
];
