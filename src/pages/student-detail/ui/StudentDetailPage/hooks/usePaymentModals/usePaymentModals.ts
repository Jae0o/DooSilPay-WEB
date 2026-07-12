import { useState } from 'react';

import type { Payment } from '@entities/payment';

import type { PaymentModalState } from './usePaymentModals.type';

// 상세 결제 모달 상태 — 상태 1개(union)로 동시 오픈 차단. useStudentModals와 달리 라우트 특례 없어 순수 로컬
const usePaymentModals = () => {
  const [modal, setModal] = useState<PaymentModalState>(null);

  return {
    modal,
    openCreate: () => setModal({ type: 'create' }),
    openEdit: (payment: Payment) => setModal({ type: 'edit', payment }),
    openDelete: (payment: Payment) => setModal({ type: 'delete', payment }),
    openMarkPaid: (payment: Payment) => setModal({ type: 'markPaid', payment }),
    close: () => setModal(null),
  };
};

export default usePaymentModals;
