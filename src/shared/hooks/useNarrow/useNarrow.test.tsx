import { render, screen } from '@testing-library/react';
import { act } from 'react';

import useNarrow from './useNarrow';

type ROEntry = { contentRect: { width: number } };
type ROCallback = (entries: ROEntry[]) => void;

let capturedCallback: ROCallback | null = null;
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();

class FakeResizeObserver {
  constructor(callback: ROCallback) {
    capturedCallback = callback;
  }

  observe = observeSpy;
  disconnect = disconnectSpy;
}

const Probe = () => {
  const [ref, narrow] = useNarrow();

  return <div ref={ref} data-testid="probe" data-narrow={narrow} />;
};

afterEach(() => {
  vi.unstubAllGlobals();
  capturedCallback = null;
  observeSpy.mockClear();
  disconnectSpy.mockClear();
});

describe('useNarrow', () => {
  it('초기 narrow는 false다', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);

    render(<Probe />);

    expect(screen.getByTestId('probe')).toHaveAttribute('data-narrow', 'false');
  });

  it('width가 maxWidth(기본 560)보다 작으면 narrow를 true로 바꾼다', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);

    render(<Probe />);
    act(() => capturedCallback?.([{ contentRect: { width: 559 } }]));

    expect(screen.getByTestId('probe')).toHaveAttribute('data-narrow', 'true');
  });

  it('width가 maxWidth 이상이면 narrow를 false로 되돌린다', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);

    render(<Probe />);
    act(() => capturedCallback?.([{ contentRect: { width: 559 } }]));
    act(() => capturedCallback?.([{ contentRect: { width: 600 } }]));

    expect(screen.getByTestId('probe')).toHaveAttribute('data-narrow', 'false');
  });

  it('언마운트 시 disconnect를 호출한다', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);

    const { unmount } = render(<Probe />);
    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
