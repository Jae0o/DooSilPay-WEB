import type { ListStudentsParams } from '@entities/student';

export interface StudentSearchBarProps {
  params: ListStudentsParams;
  onChange: (patch: Partial<ListStudentsParams>) => void;
}
