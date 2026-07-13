import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import type { AcademyProfile } from '@entities/academy';
import { ISSUED_RECEIPT_KEY } from '@entities/issued-receipt';
import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

import IssueReceiptForm from './IssueReceiptForm';

// 신규 발급(New) 모드 샘플 — student.birthDate·academy.name/ownerName 모두 채워 blocker 배너 없음.
const SAMPLE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '중등 수학',
  tuitionFee: 280000,
  otherFees: [],
  dueDate: '2026-06-10',
  paidDate: '2026-06-05',
  status: 'paid',
  method: 'transfer',
  issuedReceiptId: null,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

const SAMPLE_STUDENT: Student = {
  id: 'student-1',
  registrationNo: 7,
  name: '홍길동',
  birthDate: '2010-03-02',
  subjectName: '중등 수학',
  monthlyFee: 280000,
  paymentDay: 10,
  status: 'active',
  createdAt: '2025-03-01T00:00:00.000Z',
  updatedAt: '2025-03-01T00:00:00.000Z',
};

const SAMPLE_ACADEMY: AcademyProfile = {
  ownerId: 'academy-1',
  name: '두페이수학학원',
  ownerName: '김원장',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const renderForm = () => {
  // staleTime: Infinity — useIssuedReceiptsQuery(suspense) 캐시 시드만 읽고 백그라운드 리페치는 막는다.
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  queryClient.setQueryData(ISSUED_RECEIPT_KEY.list({}), { items: [], total: 0 });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <IssueReceiptForm
          payment={SAMPLE_PAYMENT}
          student={SAMPLE_STUDENT}
          academy={SAMPLE_ACADEMY}
          editing
          onStartEdit={vi.fn()}
          onCancelEdit={vi.fn()}
          onIssued={vi.fn()}
        />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('IssueReceiptForm', () => {
  it('교습과정·교습비를 비우고 제출하면 필수 에러 메시지를 보여준다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.clear(screen.getByLabelText(/교습과정/));
    await user.clear(screen.getByLabelText(/교습비/));
    await user.click(screen.getByRole('button', { name: /교부영수증 발급/ }));

    expect(await screen.findByText('교습과정을 입력해 주세요.')).toBeInTheDocument();
    expect(screen.getByText('교습비를 입력해 주세요.')).toBeInTheDocument();
  });

  it('에러 상태에서 유효한 값을 입력하면 에러 메시지가 사라진다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.clear(screen.getByLabelText(/교습과정/));
    await user.clear(screen.getByLabelText(/교습비/));
    await user.click(screen.getByRole('button', { name: /교부영수증 발급/ }));
    await screen.findByText('교습과정을 입력해 주세요.');

    await user.type(screen.getByLabelText(/교습과정/), '고등 수학');
    await user.type(screen.getByLabelText(/교습비/), '300000');

    await waitFor(() => {
      expect(screen.queryByText('교습과정을 입력해 주세요.')).not.toBeInTheDocument();
      expect(screen.queryByText('교습비를 입력해 주세요.')).not.toBeInTheDocument();
    });
  });
});
