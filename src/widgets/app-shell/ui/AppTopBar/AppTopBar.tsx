import { useGetAcademyQuery } from '@entities/academy';
import { Avatar, BellIcon, DooPayLogo, IconButton } from '@shared/ui';

const AppTopBar = () => {
  const { data: academy } = useGetAcademyQuery();

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface/90 px-[1.8rem] py-[1.2rem] backdrop-blur-[1rem]">
      <DooPayLogo size="2.4rem" />

      <div className="flex items-center gap-[0.4rem]">
        <IconButton label="알림" size="3.6rem" icon={<BellIcon size="2rem" />} />

        <Avatar name={academy?.ownerName} size="3.4rem" />
      </div>
    </header>
  );
};

export default AppTopBar;
