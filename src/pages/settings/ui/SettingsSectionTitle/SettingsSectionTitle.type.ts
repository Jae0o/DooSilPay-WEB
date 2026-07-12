import type { ReactNode } from 'react';

export interface SettingsSectionTitleProps {
  icon: ReactNode; // <BuildingIcon size="1.9rem" /> 형태로 주입
  title: string;
  desc?: string;
}
