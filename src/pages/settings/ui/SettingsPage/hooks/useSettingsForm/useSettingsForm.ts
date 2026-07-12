import { useForm } from 'react-hook-form';

import type { AcademyProfile, UpsertAcademyInput } from '@entities/academy';
import { useUpsertAcademyMutation } from '@entities/academy';
import { useToast } from '@shared/hooks';

import type { UseSettingsFormParams } from './useSettingsForm.type';

// S8: optional 필드는 '' 정규화 (RHF 제어 일관 — API는 trim().optional()이라 왕복 무손실)
export const toFormValues = (academy: AcademyProfile): UpsertAcademyInput => ({
  name: academy.name,
  ownerName: academy.ownerName,
  bizNo: academy.bizNo ?? '',
  tel: academy.tel ?? '',
  address: academy.address ?? '',
});

const useSettingsForm = ({ academy }: UseSettingsFormParams) => {
  const showToast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpsertAcademyInput>({ mode: 'onTouched', defaultValues: toFormValues(academy) });

  const { mutate, isPending } = useUpsertAcademyMutation();

  const save = handleSubmit((values) => {
    mutate(values, {
      onSuccess: (data) => {
        reset(toFormValues(data)); // S5: 저장 성공 = 새 기준값
        showToast({ message: '학원 정보를 저장했어요', variant: 'success' });
      },
      onError: () => showToast({ message: '저장에 실패했어요. 잠시 후 다시 시도해 주세요.', variant: 'error' }),
    });
  });

  const revert = () => reset(); // S5: 되돌리기

  return { register, errors, isDirty, isPending, save, revert }; // 소비값만 반환
};

export default useSettingsForm;
