import { httpClient } from '@shared/api';

import type { Student } from '../../model';

import { updateStudent } from './useUpdateStudentMutation';

vi.mock('@shared/api', () => ({
  httpClient: { put: vi.fn() },
}));

const mockPut = httpClient.put as unknown as ReturnType<typeof vi.fn>;

const student: Student = {
  id: 'student-1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('updateStudent', () => {
  beforeEach(() => {
    mockPut.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 수정된 수강생을 반환한다', async () => {
    mockPut.mockResolvedValue({ data: { ok: true, data: student } });

    const input = { name: '김수강', monthlyFee: 280000 };

    await expect(updateStudent({ id: 'student-1', input })).resolves.toEqual(student);
    expect(mockPut).toHaveBeenCalledWith('/students/student-1', input);
  });
});
