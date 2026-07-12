import { NavLink } from 'react-router';

import { ArrowLeftIcon, AsyncBoundary, PageHead } from '@shared/ui';
import { BulkPaymentForm, BulkPaymentFormSkeleton } from '@widgets/bulk-payment-form';

const BulkPaymentPage = () => (
  <section>
    <PageHead
      back={
        <NavLink
          to="/students"
          className="inline-flex items-center gap-[0.4rem] whitespace-nowrap text-[1.4rem] font-semibold text-ink-3"
        >
          <ArrowLeftIcon size="1.6rem" /> 수강생 목록
        </NavLink>
      }
      title="결제 등록"
      subtitle="여러 수강생의 결제를 한 번에 입력하고 일괄 저장해요."
    />

    <AsyncBoundary errorSize="md" skeleton={<BulkPaymentFormSkeleton />}>
      <BulkPaymentForm />
    </AsyncBoundary>
  </section>
);

export default BulkPaymentPage;
