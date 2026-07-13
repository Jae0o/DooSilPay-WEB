import type { IssuedReceipt } from '@entities/issued-receipt';

export interface ReceiptTemplateProps {
  data: IssuedReceipt;
  scale?: number; // 축소 배율 (transform: scale) — reflow 없이 (RW-12)
  id?: string; // PDF export 셀 타겟팅용
}
