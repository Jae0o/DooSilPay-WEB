import type { BulkPaymentRowValues } from '../BulkPaymentForm/hooks';

export interface OtherFeesModalProps {
  initial: BulkPaymentRowValues['otherFees'];
  onClose: () => void;
  onSave: (items: BulkPaymentRowValues['otherFees']) => void;
}
