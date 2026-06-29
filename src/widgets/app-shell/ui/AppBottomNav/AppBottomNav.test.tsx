import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { NAV_ITEMS } from '../../model';

import AppBottomNav from './AppBottomNav';

const renderAt = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <AppBottomNav />
    </MemoryRouter>,
  );

describe('AppBottomNav', () => {
  it('현재 경로 항목에 aria-current="page"를 부여하고 나머지는 부여하지 않는다', () => {
    renderAt('/payments/bulk');

    expect(screen.getByRole('link', { name: /결제 등록/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /수강생/ })).not.toHaveAttribute('aria-current');
  });

  it('각 항목의 href가 NAV_ITEMS의 path와 일치한다', () => {
    renderAt('/students');

    NAV_ITEMS.forEach(({ path, label }) => {
      expect(screen.getByRole('link', { name: new RegExp(label) })).toHaveAttribute('href', path);
    });
  });
});
