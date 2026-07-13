import { LayersIcon, ReceiptIcon, SettingsIcon, UsersIcon } from '@shared/ui';

import type { NavItem } from './app-shell.type';

export const NAV_ITEMS: NavItem[] = [
  { path: '/students', label: '수강생', Icon: UsersIcon },
  { path: '/payments/bulk', label: '결제 등록', Icon: LayersIcon },
  {
    path: '/issued-receipts',
    label: '교부영수증',
    Icon: ReceiptIcon,
    // 발급 폼(/payments/:paymentId/issue)에서도 "교부영수증" 활성 유지 (RW-14)
    activeMatch: (pathname) => /^\/payments\/[^/]+\/issue$/.test(pathname),
  },
  { path: '/settings/academy', label: '설정', Icon: SettingsIcon },
];
