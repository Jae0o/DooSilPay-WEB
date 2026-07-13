import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import type { AcademyProfile } from '@entities/academy';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { ISSUED_RECEIPT_KEY } from '@entities/issued-receipt';
import type { Payment } from '@entities/payment';
import type { Student } from '@entities/student';

import IssueReceiptForm from './IssueReceiptForm';

// 점선 서명란 대신 렌더할 최소 서명 이미지(inline SVG data URI) — 서명 등록 상태 비교용.
const SIGNATURE_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><text x="4" y="36" font-size="20" font-family="serif" fill="%231a222d">김원장</text></svg>',
  );

const SAMPLE_PAYMENT: Payment = {
  id: 'payment-1',
  studentId: 'student-1',
  period: '2026-06',
  subjectName: '중등 수학',
  tuitionFee: 280000,
  otherFees: [{ label: '교재비', amount: 30000 }],
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

// 생년월일 미등록 — 신규 발급 시 blocker 배너(RW-10) 트리거.
const STUDENT_NO_BIRTHDATE: Student = { ...SAMPLE_STUDENT, birthDate: undefined };

const ACADEMY_WITH_SIGNATURE: AcademyProfile = {
  ownerId: 'academy-1',
  name: '두페이수학학원',
  ownerName: '김원장',
  updatedAt: '2026-01-01T00:00:00.000Z',
  signatureUrl: SIGNATURE_DATA_URI,
};

// 서명 미등록 — noSignature 경고 배너 트리거.
const ACADEMY_NO_SIGNATURE: AcademyProfile = { ...ACADEMY_WITH_SIGNATURE, signatureUrl: undefined };

const EXISTING_RECEIPT: IssuedReceipt = {
  id: 'receipt-1',
  issueYearMonth: '2026-06',
  seq: 3,
  paymentId: SAMPLE_PAYMENT.id,
  studentSnapshot: { registrationNo: 7, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [{ label: '교재비', amount: 30000 }],
  issuedDate: '2026-06-05',
  academy: {
    name: ACADEMY_WITH_SIGNATURE.name,
    ownerName: ACADEMY_WITH_SIGNATURE.ownerName,
    signatureUrl: ACADEMY_WITH_SIGNATURE.signatureUrl,
  },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

// 동월(2026-06) 기발급 2건 — 신규 발급 시 estimatedSeq(=3) 산출용 시드.
const SEED_RECEIPTS: IssuedReceipt[] = [
  { ...EXISTING_RECEIPT, id: 'seed-1', seq: 1 },
  { ...EXISTING_RECEIPT, id: 'seed-2', seq: 2 },
];

const queryClient = new QueryClient();
queryClient.setQueryData(ISSUED_RECEIPT_KEY.list({}), { items: SEED_RECEIPTS, total: SEED_RECEIPTS.length });

/**
 * ## IssueReceiptForm
 *
 * 교부영수증 **발급/수정 폼**(`features/issue-receipt`) — RHF 필드(교습과정·발급일·교습비·기타경비 최대
 * 3개) + 자동 필드(일련번호·등록번호·성명·생년월일·연월) + 우측 실시간 미리보기(`ReceiptTemplate`)로
 * 구성된다. 신규 발급은 `useIssueReceiptMutation`, 기발급 정정은 `useUpdateIssuedReceiptMutation`을 호출하며,
 * 동월 일련번호 산정에 `useIssuedReceiptsQuery`(suspense) 캐시를 재사용한다(RW-11).
 *
 * > 신규 발급에만 적용되는 blocker(RW-10) — 학생 생년월일 미등록/학원 정보 미설정 시 배너 + 제출 버튼 비활성.
 * > 서명(`academy.signatureUrl`) 미등록이면 별도 경고 배너(하단 서명란이 비어 발급됨을 안내).
 *
 * ### Props
 *
 * - **payment** / **student** / **academy**: 발급 대상 결제·학생·학원(필수, `academy`만 로딩 중 옵셔널).
 * - **existingReceipt**: 기발급 영수증 — 있으면 정정 모드로 동작(옵셔널).
 * - **editing**: 보기/수정 토글 — 페이지가 소유(필수).
 * - **onStartEdit** / **onCancelEdit** / **onIssued**: 수정 시작·취소·발급 성공 콜백(필수).
 */
const meta = {
  title: 'features/issue-receipt/IssueReceiptForm',
  component: IssueReceiptForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    payment: SAMPLE_PAYMENT,
    student: SAMPLE_STUDENT,
    academy: ACADEMY_WITH_SIGNATURE,
    editing: true,
    onStartEdit: () => {},
    onCancelEdit: () => {},
    onIssued: () => {},
  },
  argTypes: {
    payment: { control: { disable: true }, description: '발급 대상 결제(Payment).' },
    student: { control: { disable: true }, description: '발급 대상 학생(Student).' },
    academy: { control: { disable: true }, description: '학원 프로필(AcademyProfile) — 로딩 중 옵셔널.' },
    existingReceipt: { control: { disable: true }, description: '기발급 영수증 — 있으면 정정 모드.' },
    editing: { control: 'boolean', description: '보기/수정 토글(페이지 소유).' },
    onStartEdit: { control: { disable: true }, description: '수정 시작 콜백.' },
    onCancelEdit: { control: { disable: true }, description: '수정 취소/저장 성공 콜백.' },
    onIssued: { control: { disable: true }, description: '신규 발급 성공 콜백.' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <div className="grid w-[100rem] max-w-full grid-cols-1 gap-[2rem] lg:grid-cols-[1fr_42rem] lg:items-start">
            <Story />
          </div>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof IssueReceiptForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 신규 발급 — existingReceipt 없음, 자동 채움(교습비/기타경비는 Payment에서 prefill). */
export const New: Story = {};

/** 기발급 정정 — existingReceipt + editing, 자동 필드는 스냅샷 고정값을 그대로 표시. */
export const Editing: Story = {
  args: { existingReceipt: EXISTING_RECEIPT },
};

/** 서명 미등록 — 상단 경고 배너(하단 서명란이 비어 발급됨을 안내). */
export const SignatureWarning: Story = {
  args: { academy: ACADEMY_NO_SIGNATURE },
};

/** 생년월일 미등록(RW-10) — blocker 배너 노출 + 발급 버튼 비활성. */
export const Blocked: Story = {
  args: { student: STUDENT_NO_BIRTHDATE },
};
