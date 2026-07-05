import { httpClient } from '@shared/api';

import type { Student } from '../../model';

import { updateStudentStatus } from './useUpdateStudentStatusMutation';

vi.mock('@shared/api', () => ({
  httpClient: { patch: vi.fn() },
}));

const mockPatch = httpClient.patch as unknown as ReturnType<typeof vi.fn>;

const student: Student = {
  id: 'student-1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'inactive',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('updateStudentStatus', () => {
  beforeEach(() => {
    mockPatch.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 상태가 변경된 수강생을 반환한다', async () => {
    mockPatch.mockResolvedValue({ data: { ok: true, data: student } });

    await expect(updateStudentStatus({ id: 'student-1', status: 'inactive' })).resolves.toEqual(student);
    expect(mockPatch).toHaveBeenCalledWith('/students/student-1/status', { status: 'inactive' });
  });
});
