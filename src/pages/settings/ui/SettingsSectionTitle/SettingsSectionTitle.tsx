import type { SettingsSectionTitleProps } from './SettingsSectionTitle.type';

const SettingsSectionTitle = ({ icon, title, desc }: SettingsSectionTitleProps) => (
  <div className="flex items-start gap-[1.2rem]">
    <div className="grid h-[3.8rem] w-[3.8rem] shrink-0 place-items-center rounded-md bg-point-weak text-point">
      {icon}
    </div>

    <div>
      <div className="text-[1.7rem] font-bold">{title}</div>
      {desc && <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">{desc}</div>}
    </div>
  </div>
);

export default SettingsSectionTitle;
