import { useDeleteStudentMutation } from '@entities/student';
import { useToast } from '@shared/hooks';

import type { UseDeleteStudentParams } from './useDeleteStudent.type';

const useDeleteStudent = ({ studentId, onClose, onDeleted }: UseDeleteStudentParams) => {
  const show = useToast();
  const remove = useDeleteStudentMutation();

  const onConfirm = () =>
    remove.mutate(studentId, {
      onSuccess: () => {
        show({ message: '수강생을 삭제했어요.', variant: 'success' });
        onClose();
        onDeleted?.();
      },
      onError: () => show({ message: '삭제에 실패했어요.', variant: 'error' }),
    });

  return { onConfirm, isPending: remove.isPending };
};

export default useDeleteStudent;
