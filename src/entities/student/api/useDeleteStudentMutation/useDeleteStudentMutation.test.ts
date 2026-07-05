import { httpClient } from '@shared/api';

import { deleteStudent } from './useDeleteStudentMutation';

vi.mock('@shared/api', () => ({
  httpClient: { delete: vi.fn() },
}));

const mockDelete = httpClient.delete as unknown as ReturnType<typeof vi.fn>;

describe('deleteStudent', () => {
  beforeEach(() => {
    mockDelete.mockReset();
  });

  it('200 응답이면 envelope를 언랩해 삭제된 수강생 id를 반환한다', async () => {
    mockDelete.mockResolvedValue({ data: { ok: true, data: { id: 'student-1' } } });

    await expect(deleteStudent('student-1')).resolves.toEqual({ id: 'student-1' });
    expect(mockDelete).toHaveBeenCalledWith('/students/student-1');
  });
});
