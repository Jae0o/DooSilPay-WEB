import type { ComponentType } from 'react';

import type { IconProps } from '@shared/ui';

export interface NavItem {
  path: string;
  label: string;
  Icon: ComponentType<IconProps>;
  // 기본 NavLink 매칭(경로 접두) 외 추가로 활성 처리할 경로 판정 (RW-14 — 발급 폼은 /issued-receipts 접두가 아님)
  activeMatch?: (pathname: string) => boolean;
}
