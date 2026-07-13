import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

import type { Student } from '@entities/student';
import { SUBJECT_KEY } from '@entities/subject';

import StudentFormModal from './StudentFormModal';

// SubjectSelectField(suspense)용 — 과목 캐시를 시드해 즉시 해소(네트워크 없음)
const renderModal = (ui: ReactElement) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  queryClient.setQueryData(SUBJECT_KEY.list(), ['피아노']);

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

const { createSpy, updateSpy, statusSpy } = vi.hoisted(() => ({
  createSpy: vi.fn(),
  updateSpy: vi.fn(),
  statusSpy: vi.fn(),
}));

vi.mock('@entities/student', () => ({
  useCreateStudentMutation: () => ({ mutate: createSpy, isPending: false }),
  useUpdateStudentMutation: () => ({ mutate: updateSpy, isPending: false }),
  useUpdateStudentStatusMutation: () => ({ mutate: statusSpy, isPending: false }),
}));

const student: Student = {
  id: 'student-1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  createSpy.mockClear();
  updateSpy.mockClear();
  statusSpy.mockClear();
});

const submitForm = async () => {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: '저장' }));
};

describe('StudentFormModal', () => {
  it('빈 값으로 제출하면 성명·교습비 필수 에러를 노출하고 저장 요청을 보내지 않는다', async () => {
    renderModal(<StudentFormModal open mode="create" onClose={vi.fn()} />);

    await userEvent.setup().type(screen.getByLabelText(/교습비/), '{backspace}');
    await submitForm();

    expect(await screen.findByText('성명을 입력해 주세요.')).toBeInTheDocument();
    expect(screen.getByText('교습비를 입력해 주세요.')).toBeInTheDocument();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('보호자명만 입력하면 보호자 연락처 필수 에러를 노출한다', async () => {
    const user = userEvent.setup();
    renderModal(<StudentFormModal open mode="create" onClose={vi.fn()} />);

    await user.type(screen.getByPlaceholderText('홍길동'), '홍길동');
    await user.type(screen.getByLabelText(/교습비/), '100000');
    await user.type(screen.getByLabelText(/보호자명/), '김보호자');
    await submitForm();

    expect(await screen.findByText('보호자명이 있으면 보호자 연락처는 필수입니다.')).toBeInTheDocument();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('성명·교습비를 입력해 제출하면 create mutation을 호출한다', async () => {
    const user = userEvent.setup();
    renderModal(<StudentFormModal open mode="create" onClose={vi.fn()} />);

    await user.type(screen.getByPlaceholderText('홍길동'), '홍길동');
    await user.type(screen.getByLabelText(/교습비/), '100000');
    await submitForm();

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy.mock.calls[0][0]).toMatchObject({ name: '홍길동', monthlyFee: 100000 });
  });

  it('edit 모드에서 제출하면 update mutation을 id·input과 함께 호출한다', async () => {
    renderModal(<StudentFormModal open mode="edit" student={student} onClose={vi.fn()} />);

    await submitForm();

    expect(updateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: student.id, input: expect.objectContaining({ name: student.name }) }),
      expect.anything(),
    );
  });
});
