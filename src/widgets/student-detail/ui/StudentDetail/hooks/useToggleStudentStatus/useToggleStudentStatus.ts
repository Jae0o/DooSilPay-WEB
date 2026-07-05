import { type Student, useUpdateStudentStatusMutation } from '@entities/student';
import { useToast } from '@shared/hooks';

// 상세 헤더 상태 토글(R11) — PATCH /status, 성공/실패 토스트
const useToggleStudentStatus = ({ student }: { student: Student }) => {
  const show = useToast();
  const statusMutation = useUpdateStudentStatusMutation();

  const toggle = () =>
    statusMutation.mutate(
      { id: student.id, status: student.status === 'active' ? 'inactive' : 'active' },
      {
        onSuccess: () => show({ message: '상태를 변경했어요.', variant: 'success' }),
        onError: () => show({ message: '상태 변경에 실패했어요.', variant: 'error' }),
      },
    );

  return { toggle, isPending: statusMutation.isPending };
};

export default useToggleStudentStatus;
