import { LayersIcon, ReceiptIcon, SettingsIcon, UsersIcon } from '@shared/ui';

import type { NavItem } from './app-shell.type';

export const NAV_ITEMS: NavItem[] = [
  { path: '/students', label: '수강생', Icon: UsersIcon },
  { path: '/payments/bulk', label: '결제 등록', Icon: LayersIcon },
  { path: '/issued-receipts', label: '교부영수증', Icon: ReceiptIcon },
  { path: '/settings/academy', label: '설정', Icon: SettingsIcon },
];
