import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { NAV_ITEMS } from '../../model';

import AppSidebar from './AppSidebar';

vi.mock('@entities/academy', () => ({
  useGetAcademyQuery: () => ({ data: undefined }),
}));

const renderAt = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <AppSidebar />
    </MemoryRouter>,
  );

describe('AppSidebar', () => {
  it('현재 경로 항목에 aria-current="page"를 부여하고 나머지는 부여하지 않는다', () => {
    renderAt('/students');

    expect(screen.getByRole('link', { name: /수강생/ })).toHaveAttribute('aria-current', 'page');
    NAV_ITEMS.filter(({ path }) => path !== '/students').forEach(({ label }) => {
      expect(screen.getByRole('link', { name: new RegExp(label) })).not.toHaveAttribute('aria-current');
    });
  });

  it('하위 경로(/students/123)에서도 상위 nav 항목이 active다', () => {
    renderAt('/students/123');

    expect(screen.getByRole('link', { name: /수강생/ })).toHaveAttribute('aria-current', 'page');
  });

  it('각 항목의 href가 NAV_ITEMS의 path와 일치한다', () => {
    renderAt('/students');

    NAV_ITEMS.forEach(({ path, label }) => {
      expect(screen.getByRole('link', { name: new RegExp(label) })).toHaveAttribute('href', path);
    });
  });
});
