import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('자식이 throw하면 fallback을 error와 함께 렌더한다', () => {
    const Thrower = () => {
      throw new Error('boom');
    };

    render(
      <ErrorBoundary fallback={({ error }) => <p role="alert">{error.message}</p>}>
        <Thrower />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('boom');
  });

  it('reset 호출 시 onReset을 실행하고 children을 다시 렌더한다', () => {
    const onReset = vi.fn();
    let shouldThrow = true;

    const Child = () => {
      if (shouldThrow) throw new Error('boom');
      return <p>정상 콘텐츠</p>;
    };

    render(
      <ErrorBoundary
        onReset={onReset}
        fallback={({ reset }) => (
          <button type="button" onClick={reset}>
            다시 시도
          </button>
        )}
      >
        <Child />
      </ErrorBoundary>,
    );

    shouldThrow = false;
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));

    expect(onReset).toHaveBeenCalledTimes(1);
    expect(screen.getByText('정상 콘텐츠')).toBeInTheDocument();
  });

  it('resetKeys가 바뀌면 에러 상태를 자동 해제한다', () => {
    let shouldThrow = true;

    const Child = () => {
      if (shouldThrow) throw new Error('boom');
      return <p>정상 콘텐츠</p>;
    };

    const { rerender } = render(
      <ErrorBoundary resetKeys={[1]} fallback={() => <p role="alert">에러</p>}>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    shouldThrow = false;
    rerender(
      <ErrorBoundary resetKeys={[2]} fallback={() => <p role="alert">에러</p>}>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByText('정상 콘텐츠')).toBeInTheDocument();
  });
});
