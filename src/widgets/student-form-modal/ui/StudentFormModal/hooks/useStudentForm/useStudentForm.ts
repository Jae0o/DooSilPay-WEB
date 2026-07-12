import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  type CreateStudentInput,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useUpdateStudentStatusMutation,
} from '@entities/student';
import { useToast } from '@shared/hooks';

import type { StudentFormValues, UseStudentFormParams } from './useStudentForm.type';

const EMPTY: StudentFormValues = {
  name: '',
  birthDate: '',
  subjectName: '',
  monthlyFee: 0,
  contact: '',
  guardianName: '',
  guardianContact: '',
  status: 'active',
};

// status는 CreateStudentInput에 없음 — PATCH /status 전용 (교습 정보는 PUT). 빈 옵션 필드는 undefined 미전송 → PUT 전체 교체로 서버에서 clear (R17)
const toInput = (v: StudentFormValues): CreateStudentInput => ({
  name: v.name.trim(),
  monthlyFee: Number(v.monthlyFee),
  birthDate: v.birthDate || undefined,
  subjectName: v.subjectName.trim() || undefined,
  contact: v.contact.trim() || undefined,
  guardianName: v.guardianName.trim() || undefined,
  guardianContact: v.guardianContact.trim() || undefined,
});

const useStudentForm = ({ open, onClose, mode, student }: UseStudentFormParams) => {
  const show = useToast();
  const create = useCreateStudentMutation();
  const update = useUpdateStudentMutation();
  const statusMutation = useUpdateStudentStatusMutation();
  const isPending = create.isPending || update.isPending;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({ mode: 'onTouched', defaultValues: EMPTY });

  useEffect(() => {
    if (!open) return;

    reset(
      mode === 'edit' && student
        ? {
            name: student.name,
            birthDate: student.birthDate ?? '',
            subjectName: student.subjectName ?? '',
            monthlyFee: student.monthlyFee,
            contact: student.contact ?? '',
            guardianName: student.guardianName ?? '',
            guardianContact: student.guardianContact ?? '',
            status: student.status,
          }
        : EMPTY,
    );
  }, [open, mode, student, reset]);

  // watch() 대신 useWatch — React Compiler incompatible-library 경고 회피(PaymentFormModal·useMarkPaid 선례)
  const guardianName = useWatch({ control, name: 'guardianName' });

  const onSubmit = (values: StudentFormValues) => {
    const input = toInput(values);
    const onSuccess = () => {
      show({ message: mode === 'create' ? '수강생을 등록했어요.' : '수정했어요.', variant: 'success' });
      onClose();
    };
    const onError = () => show({ message: '저장에 실패했어요. 입력값을 확인해 주세요.', variant: 'error' });

    if (mode === 'create') {
      create.mutate(input, { onSuccess, onError });
      return;
    }
    if (!student) return;

    update.mutate(
      { id: student.id, input },
      {
        onSuccess: () => {
          if (values.status !== student.status) {
            statusMutation.mutate({ id: student.id, status: values.status }); // 상태 변경분만 PATCH (R11)
          }
          onSuccess();
        },
        onError,
      },
    );
  };

  return { register, errors, guardianName, isPending, submit: handleSubmit(onSubmit) };
};

export default useStudentForm;
