import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useSubjectsCard from './useSubjectsCard';

const { showSpy, addSpy, removeSpy } = vi.hoisted(() => ({
  showSpy: vi.fn(),
  addSpy: vi.fn(),
  removeSpy: vi.fn(),
}));

vi.mock('@shared/hooks', () => ({ useToast: () => showSpy }));
vi.mock('@shared/api', () => ({ getApiErrorCode: (error: { code?: string }) => error?.code }));
vi.mock('@entities/subject', () => ({
  SUBJECT_KEY: { list: () => ['subjects', 'list'] },
  useSubjectsQuery: () => ({ data: ['Piano'] }),
  useAddSubjectMutation: () => ({ mutate: addSpy, isPending: false }),
  useRemoveSubjectMutation: () => ({ mutate: removeSpy }),
}));

const Harness = () => {
  const { register, submitAdd, subjects, remove } = useSubjectsCard();

  return (
    <form onSubmit={submitAdd}>
      <input aria-label="과목 이름" {...register('name')} />
      <button type="submit">추가</button>
      {subjects.map((subject) => (
        <button type="button" key={subject} onClick={() => remove(subject)}>
          {`삭제-${subject}`}
        </button>
      ))}
    </form>
  );
};

const queryClient = new QueryClient();
const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

const renderCard = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Harness />
    </QueryClientProvider>,
  );

beforeEach(() => {
  showSpy.mockReset();
  addSpy.mockReset();
  removeSpy.mockReset();
  invalidateSpy.mockClear();
});

describe('useSubjectsCard', () => {
  it('대소문자 무시 중복은 선제 차단하고 추가 요청을 보내지 않는다', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.type(screen.getByLabelText('과목 이름'), 'piano');
    await user.click(screen.getByRole('button', { name: '추가' }));

    expect(showSpy).toHaveBeenCalledWith({ message: '이미 등록된 과목이에요', variant: 'warning' });
    expect(addSpy).not.toHaveBeenCalled();
  });

  it('새 과목은 trim 후 추가 요청하고, 성공 시 성공 토스트 + 입력 초기화', async () => {
    addSpy.mockImplementation((_name, options) => options.onSuccess());
    const user = userEvent.setup();
    renderCard();

    const input = screen.getByLabelText('과목 이름');
    await user.type(input, '  드럼  ');
    await user.click(screen.getByRole('button', { name: '추가' }));

    expect(addSpy).toHaveBeenCalledWith('드럼', expect.anything());
    expect(showSpy).toHaveBeenCalledWith({ message: '“드럼” 과목을 추가했어요', variant: 'success' });
    expect(input).toHaveValue('');
  });

  it('서버 409(SUBJECT_DUPLICATED)는 중복 토스트로 전파한다', async () => {
    addSpy.mockImplementation((_name, options) => options.onError({ code: 'SUBJECT_DUPLICATED' }));
    const user = userEvent.setup();
    renderCard();

    await user.type(screen.getByLabelText('과목 이름'), '기타');
    await user.click(screen.getByRole('button', { name: '추가' }));

    expect(showSpy).toHaveBeenCalledWith({ message: '이미 등록된 과목이에요', variant: 'warning' });
  });

  it('삭제 404(SUBJECT_NOT_FOUND)는 안내 후 목록을 재동기화한다', async () => {
    removeSpy.mockImplementation((_name, options) => options.onError({ code: 'SUBJECT_NOT_FOUND' }));
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: '삭제-Piano' }));

    expect(showSpy).toHaveBeenCalledWith({ message: '이미 삭제된 과목이에요', variant: 'warning' });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['subjects', 'list'] });
  });
});
