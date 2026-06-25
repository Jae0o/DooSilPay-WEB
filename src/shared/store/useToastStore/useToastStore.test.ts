import useToastStore from './useToastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('show 는 기본 variant info·duration 2600 으로 토스트를 추가하고 id 를 반환한다', () => {
    const id = useToastStore.getState().show({ message: '안녕' });

    const { toasts } = useToastStore.getState();
    expect(toasts).toHaveLength(1);
    expect(toasts[0]).toMatchObject({ id, message: '안녕', variant: 'info', duration: 2600 });
    expect(typeof id).toBe('string');
  });

  it('duration 경과 후 자동으로 dismiss 된다', () => {
    useToastStore.getState().show({ message: '사라짐' });
    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(2600);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('variant·duration 을 지정하면 그대로 반영한다', () => {
    useToastStore.getState().show({ message: '에러', variant: 'error', duration: 1000 });

    expect(useToastStore.getState().toasts[0]).toMatchObject({ variant: 'error', duration: 1000 });
  });

  it('dismiss 는 해당 토스트만 제거한다', () => {
    const keepId = useToastStore.getState().show({ message: '유지', duration: 0 });
    const removeId = useToastStore.getState().show({ message: '제거', duration: 0 });

    useToastStore.getState().dismiss(removeId);

    const { toasts } = useToastStore.getState();
    expect(toasts).toHaveLength(1);
    expect(toasts[0].id).toBe(keepId);
  });

  it('duration 0 이면 자동 소멸 타이머를 걸지 않는다', () => {
    useToastStore.getState().show({ message: '영구', duration: 0 });

    vi.advanceTimersByTime(10000);
    expect(useToastStore.getState().toasts).toHaveLength(1);
  });
});
