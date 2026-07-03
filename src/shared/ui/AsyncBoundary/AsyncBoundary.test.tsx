import { render, screen } from '@testing-library/react';

import AsyncBoundary from './AsyncBoundary';

const Suspender = () => {
  throw new Promise(() => {});
};

const Thrower = () => {
  throw new Error('boom');
};

describe('AsyncBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('suspend하는 자식이면 skeleton을 렌더한다', () => {
    render(
      <AsyncBoundary skeleton={<p>로딩 중</p>}>
        <Suspender />
      </AsyncBoundary>,
    );

    expect(screen.getByText('로딩 중')).toBeInTheDocument();
  });

  it('throw하는 자식이면 errorSize를 반영한 기본 ErrorFallback을 렌더한다', () => {
    render(
      <AsyncBoundary skeleton={null} errorSize="sm">
        <Thrower />
      </AsyncBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('불러오지 못했어요');
    expect(screen.getByRole('button', { name: '다시 시도' })).toBeInTheDocument();
  });

  it('errorFallback을 주면 기본 ErrorFallback 대신 렌더한다', () => {
    render(
      <AsyncBoundary skeleton={null} errorFallback={({ error }) => <p role="alert">커스텀: {error.message}</p>}>
        <Thrower />
      </AsyncBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('커스텀: boom');
    expect(screen.queryByRole('button', { name: '다시 시도' })).not.toBeInTheDocument();
  });
});
