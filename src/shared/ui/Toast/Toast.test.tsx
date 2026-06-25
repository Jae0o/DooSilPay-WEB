import { render, screen } from '@testing-library/react';

import Toast from './Toast';
import type { ToastItem } from './Toast.type';

const makeItem = (overrides: Partial<ToastItem> = {}): ToastItem => ({
  id: '1',
  message: '안내 메시지',
  variant: 'info',
  duration: 2600,
  ...overrides,
});

describe('Toast', () => {
  it('role=status 알약과 메시지를 렌더한다', () => {
    render(<Toast item={makeItem({ message: '납부 처리했어요' })} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('납부 처리했어요')).toBeInTheDocument();
  });

  it.each([
    ['info', 'text-point'],
    ['success', 'text-ok'],
    ['warning', 'text-warn'],
    ['error', 'text-danger'],
  ] as const)('%s variant 는 %s 아이콘 색을 적용한다', (variant, colorClass) => {
    const { container } = render(<Toast item={makeItem({ variant })} />);
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg).toHaveClass(colorClass);
  });
});
