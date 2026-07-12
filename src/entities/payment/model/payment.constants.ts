import type { PaymentMethod, PaymentStatus } from './payment.type';

export const METHOD_LABEL: Record<PaymentMethod, string> = {
  card: '카드',
  transfer: '계좌이체',
  cash: '현금',
};

export const STATUS_LABEL: Record<PaymentStatus, string> = {
  scheduled: '예정',
  paid: '납부완료',
  overdue: '미납',
};

export const STATUS_TONE: Record<PaymentStatus, 'muted' | 'ok' | 'danger'> = {
  scheduled: 'muted',
  paid: 'ok',
  overdue: 'danger',
};
