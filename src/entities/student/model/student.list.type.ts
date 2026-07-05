import type { Student, StudentStatus } from './student.type';

export interface ListStudentsParams {
  q?: string;
  status?: StudentStatus | 'all'; // 기본 active
  page?: number; // 기본 1
  limit?: number; // 기본 20 (1~100)
  sort?: 'registrationNo' | 'name'; // 기본 registrationNo
  order?: 'asc' | 'desc'; // 기본 asc
}

export interface ListStudentsResult {
  items: Student[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}
