import { httpClient } from '@shared/api';

import type { Student } from '../../model';

import { createStudent } from './useCreateStudentMutation';

vi.mock('@shared/api', () => ({
  httpClient: { post: vi.fn() },
}));

const mockPost = httpClient.post as unknown as ReturnType<typeof vi.fn>;

const student: Student = {
  id: 'student-1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('createStudent', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 생성된 수강생을 반환한다', async () => {
    mockPost.mockResolvedValue({ data: { ok: true, data: student } });

    const input = { name: '김수강', monthlyFee: 280000 };

    await expect(createStudent(input)).resolves.toEqual(student);
    expect(mockPost).toHaveBeenCalledWith('/students', input);
  });
});
