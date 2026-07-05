import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Student } from '@entities/student';

import DeleteStudentDialog from './DeleteStudentDialog';

const mutateSpy = vi.hoisted(() => vi.fn());

vi.mock('@entities/student', () => ({
  useDeleteStudentMutation: () => ({ mutate: mutateSpy, isPending: false }),
}));

const setMatchMedia = () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
};

const student: Student = {
  id: 'student-1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

afterEach(() => {
  vi.unstubAllGlobals();
  mutateSpy.mockClear();
});

describe('DeleteStudentDialog', () => {
  it('삭제 버튼 클릭 시 studentId로 삭제 뮤테이션을 호출한다', async () => {
    setMatchMedia();
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<DeleteStudentDialog open student={student} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(mutateSpy).toHaveBeenCalledWith(student.id, expect.any(Object));
  });

  it('취소 버튼 클릭 시 onClose를 호출한다', async () => {
    setMatchMedia();
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<DeleteStudentDialog open student={student} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(onClose).toHaveBeenCalled();
  });
});
