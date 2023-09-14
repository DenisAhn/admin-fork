import { OrderStatus } from './entity';

export const ORDER_STATUS_TEXT_MAPPER: Record<OrderStatus, string> = {
  pending: 'Pending',
  awaitsConfirmation: 'Awaits Confirmation',
  awaitsPayment: 'Awaits payment',
  paid: 'Paid',
  inProgress: 'In progress',
  awaitsPostPayment: 'Awaits post-payment',
  completed: 'Completed',
  archived: 'Archived',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
  hasIssues: 'Has issues',
  paused: 'Paused',
};

export const MAP_STATUS_TO_COLOR: Record<
  OrderStatus,
  { title: string; background: string }
> = {
  [OrderStatus.pending]: {
    title: '#80A545',
    background: '#80A54529',
  },
  [OrderStatus.pending]: {
    title: '#B7BA15',
    background: '#B7BA1529',
  },
  [OrderStatus.awaitsConfirmation]: {
    title: '#B76E00',
    background: '#B76E0029',
  },
  [OrderStatus.awaitsPayment]: {
    title: '#1696C1',
    background: '#1696C129',
  },
  [OrderStatus.paid]: {
    title: '#4665E6',
    background: '#4665E629',
  },
  [OrderStatus.inProgress]: {
    title: '#7E9F21',
    background: '#7E9F2129',
  },
  [OrderStatus.awaitsPostPayment]: {
    title: '#1696C1',
    background: '#1696C129',
  },
  [OrderStatus.completed]: {
    title: '#1B806A',
    background: '#1B806A29',
  },
  [OrderStatus.archived]: {
    title: '#8F0A8A',
    background: '#8F0A8A29',
  },
  [OrderStatus.rejected]: {
    title: '#8F0A0E',
    background: '#8F0A0E29',
  },
  [OrderStatus.cancelled]: {
    title: '#600ABC',
    background: '#600ABC29',
  },
  [OrderStatus.hasIssues]: {
    title: '#212B36',
    background: '#212B3629',
  },
  [OrderStatus.paused]: {
    title: '#B76E00',
    background: '#B76E0029',
  },
};

export const ORDER_STATUS_COLORS_MAPPER: Record<OrderStatus, string> = {
  [OrderStatus.awaitsPayment]: '#1696C1',
  [OrderStatus.awaitsPostPayment]: '#1696C1',
  [OrderStatus.awaitsConfirmation]: '#B7BA15',
  [OrderStatus.inProgress]: '#7E9F21',
  [OrderStatus.completed]: '#1B806A',
  [OrderStatus.rejected]: '#8F0A0E',
  [OrderStatus.hasIssues]: '#212B36',
  [OrderStatus.cancelled]: '#600ABC',
  [OrderStatus.pending]: '#44D09E',
  [OrderStatus.archived]: '#5D6F84',
  [OrderStatus.paused]: '#B76E00',
  [OrderStatus.paid]: '#4665E6',
};
