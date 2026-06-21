import { render } from '@testing-library/react';

import { AlertIcon, CheckCircleIcon, InfoIcon, LockIcon, MailIcon, SettingsIcon } from './';

const ICONS = [MailIcon, LockIcon, SettingsIcon, InfoIcon, CheckCircleIcon, AlertIcon];

describe('Icons', () => {
  it('각 아이콘이 svg를 렌더한다', () => {
    for (const Icon of ICONS) {
      const { container } = render(<Icon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    }
  });

  it('size를 width·height에 반영한다 (기본 2rem)', () => {
    const { container: defaultBox } = render(<MailIcon />);
    expect(defaultBox.querySelector('svg')).toHaveAttribute('width', '2rem');

    const { container: sizedBox } = render(<MailIcon size="3.2rem" />);
    const svg = sizedBox.querySelector('svg');
    expect(svg).toHaveAttribute('width', '3.2rem');
    expect(svg).toHaveAttribute('height', '3.2rem');
  });

  it('stroke=currentColor 라인 아이콘이다', () => {
    const { container } = render(<LockIcon />);
    expect(container.querySelector('svg')).toHaveAttribute('stroke', 'currentColor');
  });
});
