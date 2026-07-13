import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';
import { SUBJECT_KEY } from '@entities/subject';
import { Button } from '@shared/ui';

import PaymentFormModal from './PaymentFormModal';

const queryClient = new QueryClient();
// 교습과목 필드(SubjectSelectField, suspense) — 캐시 사전 시딩으로 즉시 해소(V2-4)
queryClient.setQueryData(SUBJECT_KEY.list(), ['중등 수학', '고등 영어', '피아노']);

const SAMPLE_STUDENT: Student = {
  id: 'student-1',
  registrationNo: 12,
  name: '김두실',
  birthDate: '2015-03-21',
  subjectName: '중등 수학',
  monthlyFee: 250000,
  paymentDay: 10,
  guardianName: '김보호',
  guardianContact: '010-1234-5678',
  contact: '010-9876-5432',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

// 기타경비 2건 + 계좌이체 — edit prefill 시연용.
const SAMPLE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '중등 수학',
  tuitionFee: 250000,
  otherFees: [
    { label: '교재비', amount: 30000 },
    { label: '모의고사', amount: 15000 },
  ],
  dueDate: '2026-06-10',
  paidDate: null,
  status: 'scheduled',
  method: 'transfer',
  issuedReceiptId: null,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
};

/**
 * ## PaymentFormModal 위젯
 *
 * 결제 등록/수정 **공용 폼 모달**. `mode`가 `create`면 `student`(과목·교습비·예정일)로 prefill한 빈 폼,
 * `edit`이면 `payment` 값으로 복원한다. 기타경비는 최대 3개까지 동적으로 추가하며, 합계는 라이브로 갱신된다.
 *
 * > 조건부 마운트 컴포넌트(`open` prop 없음) — 부모가 `{open && <PaymentFormModal … />}`로 렌더한다.
 * > 실제 제출(등록·수정 뮤테이션)은 이 시연 범위 밖이며, 폼 구성·검증만 확인한다. 교부영수증·첨부 UI는 없다(P8).
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { PaymentFormModal } from '@widgets/payment-form-modal';
 *
 * {open && <PaymentFormModal mode="create" student={student} onClose={() => setOpen(false)} />}
 * ```
 *
 * ### Props
 *
 * - **mode**: `create` | `edit`(필수)
 * - **student**: prefill·subtitle·studentId 공급(필수)
 * - **payment**: `edit` 모드에서 복원할 결제 데이터
 * - **onClose**: 닫기 핸들러(필수)
 * - **onSuccess**: 저장 완료 후 추가 동작(선택)
 */
const meta = {
  title: 'widgets/payment-form-modal/PaymentFormModal',
  component: PaymentFormModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { mode: 'create', student: SAMPLE_STUDENT, onClose: () => {} },
  argTypes: {
    mode: { control: { type: 'radio' }, options: ['create', 'edit'], description: '등록/수정 모드.' },
    student: { control: { disable: true }, description: 'prefill·subtitle·studentId 공급(필수).' },
    payment: { control: { disable: true }, description: '수정 모드 복원 데이터.' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
    onSuccess: { control: { disable: true }, description: '저장 완료 후 추가 동작(선택).' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof PaymentFormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const CreateDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>결제 추가</Button>
      {open && <PaymentFormModal mode="create" student={SAMPLE_STUDENT} onClose={() => setOpen(false)} />}
    </>
  );
};

/** 수강생 정보로 prefill한 등록 모달(과목·교습비·예정일). 기타경비 추가·합계 라이브 갱신 확인. */
export const Create: Story = { render: () => <CreateDemo /> };

const EditDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>결제 수정</Button>
      {open && (
        <PaymentFormModal
          mode="edit"
          student={SAMPLE_STUDENT}
          payment={SAMPLE_PAYMENT}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

/** 기존 결제 데이터로 복원되는 수정 모달(기타경비 2건·결제수단·상태 포함). `paidDate`는 폼 미노출(P15). */
export const Edit: Story = { render: () => <EditDemo /> };
