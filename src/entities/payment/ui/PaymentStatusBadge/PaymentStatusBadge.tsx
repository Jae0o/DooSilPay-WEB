import { Badge } from '@shared/ui';

import { STATUS_LABEL, STATUS_TONE } from '../../model';

import type { PaymentStatusBadgeProps } from './PaymentStatusBadge.type';

const PaymentStatusBadge = ({ status, size }: PaymentStatusBadgeProps) => (
  <Badge tone={STATUS_TONE[status]} dot size={size}>
    {STATUS_LABEL[status]}
  </Badge>
);

export default PaymentStatusBadge;
