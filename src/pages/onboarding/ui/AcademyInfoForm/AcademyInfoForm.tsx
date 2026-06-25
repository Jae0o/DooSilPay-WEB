import { useForm } from 'react-hook-form';

import type { UpsertAcademyInput } from '@entities/academy';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BuildingIcon,
  Button,
  EditIcon,
  FormField,
  TextInput,
  UploadIcon,
} from '@shared/ui';

import type { AcademyInfoFormProps } from './AcademyInfoForm.type';

const AcademyInfoForm = ({ onBack, onSubmit, isPending }: AcademyInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpsertAcademyInput>({
    mode: 'onTouched',
    defaultValues: { name: '', ownerName: '', bizNo: '', tel: '', address: '' },
  });

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="-mt-[1.4rem] mb-[2rem] inline-flex items-center gap-[0.6rem] text-[1.4rem] font-semibold text-ink-3"
      >
        <ArrowLeftIcon size="1.6rem" /> 이전
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-surface rounded-xl border border-line p-[2.8rem] shadow-sm">
          <div className="flex flex-col gap-[1.8rem]">
            <FormField label="학원명 / 상호" required error={errors.name?.message}>
              <TextInput
                placeholder="예) 두페이수학학원"
                invalid={!!errors.name}
                prefix={<BuildingIcon size="1.8rem" />}
                {...register('name', { required: '학원명을 입력해 주세요.' })}
              />
            </FormField>

            <FormField label="대표자 / 교습자명" required error={errors.ownerName?.message}>
              <TextInput
                placeholder="예) 김도윤"
                invalid={!!errors.ownerName}
                {...register('ownerName', { required: '대표자명을 입력해 주세요.' })}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-[1.4rem] md:grid-cols-2">
              <FormField label="사업자등록번호" hint="선택">
                <TextInput placeholder="000-00-00000" {...register('bizNo')} />
              </FormField>
              <FormField label="대표 전화" hint="선택">
                <TextInput placeholder="02-000-0000" {...register('tel')} />
              </FormField>
            </div>

            <FormField label="학원 주소" hint="선택">
              <TextInput placeholder="도로명 주소" {...register('address')} />
            </FormField>

            <div className="flex flex-col gap-[1.2rem] rounded-md bg-surface-2 p-[1.4rem] md:flex-row md:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-[1.2rem]">
                <div className="grid h-[4.4rem] w-[4.4rem] shrink-0 place-items-center rounded-sm border border-dashed border-line-2 text-ink-3">
                  <EditIcon size="1.8rem" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[1.4rem] font-semibold">서명 / 인 이미지</div>
                  <div className="break-keep text-[1.3rem] text-ink-3">영수증 발급 전까지 등록하면 돼요 · 선택</div>
                </div>
              </div>
              <Button
                variant="neutral"
                size="sm"
                icon={<UploadIcon size="1.8rem" />}
                disabled
                className="w-full shrink-0 md:w-auto"
              >
                업로드
              </Button>
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              isLoading={isPending}
              iconRight={<ArrowRightIcon />}
              className="mt-[2rem]"
            >
              두페이 시작하기
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AcademyInfoForm;
