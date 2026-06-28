import type { ComponentType } from 'react';

import type { IconProps } from '@shared/ui';

export interface NavItem {
  path: string;
  label: string;
  Icon: ComponentType<IconProps>;
}
