import type { BulkPaymentRowValues } from '../BulkPaymentForm/hooks';

export interface OtherFeesCellProps {
  otherFees: BulkPaymentRowValues['otherFees'];
  onOpen: () => void;
}
