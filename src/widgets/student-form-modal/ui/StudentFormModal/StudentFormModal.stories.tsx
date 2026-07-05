import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import type { Student } from '@entities/student';
import { Button } from '@shared/ui';

import StudentFormModal from './StudentFormModal';

const queryClient = new QueryClient();

const SAMPLE_STUDENT: Student = {
  id: 'student-1',
  registrationNo: 12,
  name: '김두실',
  birthDate: '2015-03-21',
  subjectName: '수학',
  monthlyFee: 250000,
  paymentDay: 10,
  guardianName: '김보호',
  guardianContact: '010-1234-5678',
  contact: '010-9876-5432',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

/**
 * ## StudentFormModal 위젯
 *
 * 수강생 등록/수정 폼 모달. `mode`가 `create`면 빈 폼, `edit`이면 `student` 값으로 prefill되고
 * 수강 상태(`active`/`inactive`) 필드가 추가로 노출된다.
 *
 * > 실제 제출(등록·수정 뮤테이션)은 이 시연 범위 밖이며, 열기/닫기와 폼 구성만 확인한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { StudentFormModal } from '@widgets/student-form-modal';
 *
 * <StudentFormModal open={open} mode="create" onClose={() => setOpen(false)} />;
 * ```
 *
 * ### Props
 *
 * - **open**: 열림 여부(필수)
 * - **onClose**: 닫기 핸들러(필수)
 * - **mode**: `create` | `edit`(필수)
 * - **student**: `edit` 모드에서 prefill할 수강생 데이터
 */
const meta = {
  title: 'widgets/student-form-modal/StudentFormModal',
  component: StudentFormModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { open: false, onClose: () => {}, mode: 'create' },
  argTypes: {
    open: { control: { disable: true }, description: '열림 여부(필수).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
    mode: {
      control: { type: 'radio' },
      options: ['create', 'edit'],
      description: '등록/수정 모드.',
    },
    student: { control: { disable: true }, description: '수정 모드 prefill 데이터.' },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof StudentFormModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const CreateDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>수강생 등록</Button>
      <StudentFormModal open={open} mode="create" onClose={() => setOpen(false)} />
    </>
  );
};

/** 빈 폼으로 여는 등록 모달. */
export const Create: Story = { render: () => <CreateDemo /> };

const EditDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>수강생 정보 수정</Button>
      <StudentFormModal open={open} mode="edit" student={SAMPLE_STUDENT} onClose={() => setOpen(false)} />
    </>
  );
};

/** 기존 수강생 데이터로 prefill되는 수정 모달. */
export const Edit: Story = { render: () => <EditDemo /> };
