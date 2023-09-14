export enum OrderStatus {
  pending = 'pending',
  paused = 'paused',
  awaitsConfirmation = 'awaitsConfirmation',
  paid = 'paid',
  inProgress = 'inProgress',
  awaitsPayment = 'awaitsPayment',
  awaitsPostPayment = 'awaitsPostPayment',
  completed = 'completed',
  archived = 'archived',
  cancelled = 'cancelled',
  rejected = 'rejected',
  hasIssues = 'hasIssues',
}
