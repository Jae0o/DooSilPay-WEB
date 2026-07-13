import type { IssuedReceipt } from '@entities/issued-receipt';

export interface ReceiptListProps {
  rows: IssuedReceipt[];
  onPreview: (receipt: IssuedReceipt) => void;
  onDelete: (receipt: IssuedReceipt) => void;
}
