import { useIssuedReceiptsQuery } from '@entities/issued-receipt';
import { usePaymentsQuery } from '@entities/payment';
import { EmptyState } from '@shared/ui';

import IssueReceiptBody from './IssueReceiptBody';

// 경계 내부 데이터 컴포넌트 — suspend는 상위 AsyncBoundary가 수신 (R18 원형).
// 단건 GET 없이 전체 목록에서 paymentId 매칭(RW-13) — 새로고침/딥링크에도 안전.
const IssueReceiptContent = ({ paymentId }: { paymentId: string }) => {
  const { data: paymentsData } = usePaymentsQuery({});
  const { data: receiptsData } = useIssuedReceiptsQuery();

  const payment = paymentsData.items.find((item) => item.id === paymentId);

  if (!payment) return <EmptyState title="결제를 찾을 수 없어요" />;

  const existingReceipt = receiptsData.items.find((receipt) => receipt.paymentId === payment.id);

  return <IssueReceiptBody payment={payment} existingReceipt={existingReceipt} />;
};

export default IssueReceiptContent;
