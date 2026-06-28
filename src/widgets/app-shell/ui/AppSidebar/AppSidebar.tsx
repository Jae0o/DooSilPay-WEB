import { NavLink } from 'react-router';

import { useGetAcademyQuery } from '@entities/academy';
import { Avatar, DooPayLogo } from '@shared/ui';
import { cn } from '@shared/utils';

import { NAV_ITEMS } from '../../model';

const AppSidebar = () => {
  const { data: academy } = useGetAcademyQuery();

  return (
    <aside className="flex h-full w-[24.8rem] shrink-0 flex-col border-r border-line bg-surface px-[1.8rem] py-[2.6rem]">
      <div className="px-[0.8rem] pb-[0.8rem]">
        <DooPayLogo size="2.6rem" />
      </div>

      <nav className="mt-[2.2rem] flex flex-1 flex-col gap-[0.4rem]">
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-[1.2rem] rounded-md px-[1.4rem] py-[1.2rem] text-[1.5rem] font-semibold transition-colors',
                isActive ? 'bg-point-weak text-point' : 'text-ink-2 hover:bg-surface-2',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size="2rem" strokeWidth={isActive ? 2.1 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <footer className="flex items-center gap-[1rem] border-t border-line px-[0.8rem] pt-[1.4rem]">
        <Avatar name={academy?.ownerName} size="3.8rem" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[1.4rem] font-bold">{academy?.name}</div>
          <div className="text-[1.2rem] text-ink-3">{academy?.ownerName} 원장</div>
        </div>
      </footer>
    </aside>
  );
};

export default AppSidebar;
