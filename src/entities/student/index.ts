export {
  STUDENT_KEY,
  useStudentsQuery,
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
} from './model';
