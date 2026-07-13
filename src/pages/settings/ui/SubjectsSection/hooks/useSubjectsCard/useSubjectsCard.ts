import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { SUBJECT_KEY, useAddSubjectMutation, useRemoveSubjectMutation, useSubjectsQuery } from '@entities/subject';
import { getApiErrorCode } from '@shared/api';
import { useToast } from '@shared/hooks';

interface SubjectInputValues {
  name: string;
}

const useSubjectsCard = () => {
  const queryClient = useQueryClient();
  const show = useToast();

  const { data: subjects } = useSubjectsQuery();
  const addMutation = useAddSubjectMutation();
  const removeMutation = useRemoveSubjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectInputValues>({ defaultValues: { name: '' } });

  const submitAdd = handleSubmit(({ name }) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // 선제 중복 검사(대소문자 무시) — 불필요 요청 방지(SJ7)
    if (subjects.some((subject) => subject.toLowerCase() === trimmed.toLowerCase())) {
      show({ message: '이미 등록된 과목이에요', variant: 'warning' });
      return;
    }

    addMutation.mutate(trimmed, {
      onSuccess: () => {
        show({ message: `“${trimmed}” 과목을 추가했어요`, variant: 'success' });
        reset();
      },
      onError: (error) => {
        if (getApiErrorCode(error) === 'SUBJECT_DUPLICATED') {
          show({ message: '이미 등록된 과목이에요', variant: 'warning' });
          return;
        }
        show({ message: '과목 추가에 실패했어요', variant: 'error' });
      },
    });
  });

  const remove = (name: string) => {
    removeMutation.mutate(name, {
      onSuccess: () => show({ message: `“${name}” 과목을 삭제했어요`, variant: 'success' }),
      onError: (error) => {
        if (getApiErrorCode(error) === 'SUBJECT_NOT_FOUND') {
          // 다른 기기에서 이미 삭제됨 — 안내 후 목록 재동기화(SJ7)
          show({ message: '이미 삭제된 과목이에요', variant: 'warning' });
          queryClient.invalidateQueries({ queryKey: SUBJECT_KEY.list() });
          return;
        }
        show({ message: '과목 삭제에 실패했어요', variant: 'error' });
      },
    });
  };

  return {
    subjects,
    register,
    errors,
    submitAdd,
    isAdding: addMutation.isPending,
    remove,
  };
};

export default useSubjectsCard;
