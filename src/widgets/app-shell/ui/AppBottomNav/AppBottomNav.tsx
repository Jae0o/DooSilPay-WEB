import { NavLink, useLocation } from 'react-router';

import { cn } from '@shared/utils';

import { NAV_ITEMS } from '../../model';

const AppBottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex border-t border-line bg-surface px-[0.8rem] pt-[0.8rem] pb-[calc(0.8rem+env(safe-area-inset-bottom))]">
      {NAV_ITEMS.map(({ path, label, Icon, activeMatch }) => {
        const forcedActive = activeMatch?.(pathname) ?? false;

        return (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-[0.3rem] py-[0.6rem] text-[1.1rem] font-semibold',
                isActive || forcedActive ? 'text-point' : 'text-ink-3',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size="2.2rem" strokeWidth={isActive || forcedActive ? 2.1 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default AppBottomNav;
