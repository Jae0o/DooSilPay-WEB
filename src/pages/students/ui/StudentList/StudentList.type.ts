import type { Student } from '@entities/student';

export interface StudentListProps {
  students: Student[];
  hasNext?: boolean;
  onLoadMore?: () => void;
  onRowClick: (id: string) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}
