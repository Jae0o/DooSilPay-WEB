export {
  STUDENT_KEY,
  useStudentsQuery,
  useStudentsSummaryQuery,
  useStudentQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useUpdateStudentStatusMutation,
  useDeleteStudentMutation,
} from './api';
export type {
  Student,
  StudentStatus,
  CreateStudentInput,
  UpdateStudentInput,
  ListStudentsParams,
  ListStudentsResult,
  StudentsSummary,
} from './model';
