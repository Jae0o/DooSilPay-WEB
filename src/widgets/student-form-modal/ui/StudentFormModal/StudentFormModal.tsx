import { Button, FormField, Modal, Select, TextField } from '@shared/ui';

import type { StudentFormModalProps } from './StudentFormModal.type';
import { useStudentForm } from './hooks';

const STATUS_OPTIONS = [
  { value: 'active', label: '수강중' },
  { value: 'inactive', label: '휴식중' },
];

const StudentFormModal = ({ open, onClose, mode, student }: StudentFormModalProps) => {
  const { register, errors, guardianName, isPending, submit } = useStudentForm({ open, onClose, mode, student });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title={mode === 'create' ? '수강생 등록' : '수강생 정보 수정'}
      subtitle={mode === 'create' ? '등록번호는 저장 시 자동으로 부여돼요.' : undefined}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" form="student-form" isLoading={isPending}>
            저장
          </Button>
        </>
      }
    >
      <form id="student-form" onSubmit={submit} className="flex flex-col gap-[1.6rem]">
        <div className="grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2">
          <TextField
            label="성명"
            required
            error={errors.name?.message}
            placeholder="홍길동"
            {...register('name', {
              required: '성명을 입력해 주세요.',
              maxLength: { value: 20, message: '20자 이내로 입력해 주세요.' },
            })}
          />

          <TextField
            label="생년월일"
            error={errors.birthDate?.message}
            type="date"
            {...register('birthDate', {
              validate: (v) => !v || new Date(v) <= new Date() || '생년월일은 미래일 수 없습니다.',
            })}
          />
        </div>

        <div className="grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2">
          <TextField
            label="과목"
            error={errors.subjectName?.message}
            {...register('subjectName', { maxLength: { value: 30, message: '30자 이내로 입력해 주세요.' } })}
          />

          <TextField
            label="기본 교습비"
            required
            error={errors.monthlyFee?.message}
            type="number"
            suffix="원"
            {...register('monthlyFee', {
              valueAsNumber: true, // 빈 입력은 NaN → required로 안 잡히므로 validate에서 처리
              min: { value: 0, message: '0 이상이어야 합니다.' },
              validate: {
                filled: (v) => !Number.isNaN(v) || '교습비를 입력해 주세요.',
                integer: (v) => Number.isInteger(v) || '교습비는 정수로 입력해 주세요.',
              },
            })}
          />
        </div>

        <div className="grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2">
          <TextField
            label="본인 연락처"
            error={errors.contact?.message}
            placeholder="010-0000-0000"
            {...register('contact', { maxLength: { value: 20, message: '20자 이내로 입력해 주세요.' } })}
          />
        </div>

        <div className="border-t border-line pt-[1.6rem]">
          <p className="mb-[1.2rem] text-[1.3rem] font-semibold text-ink-3">보호자 정보 (미성년자)</p>

          <div className="grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2">
            <TextField
              label="보호자명"
              error={errors.guardianName?.message}
              placeholder="선택"
              {...register('guardianName', { maxLength: { value: 20, message: '20자 이내로 입력해 주세요.' } })}
            />

            <TextField
              label="보호자 연락처"
              error={errors.guardianContact?.message}
              placeholder="선택"
              {...register('guardianContact', {
                maxLength: { value: 20, message: '20자 이내로 입력해 주세요.' },
                validate: (v) => !guardianName || !!v || '보호자명이 있으면 보호자 연락처는 필수입니다.',
              })}
            />
          </div>
        </div>

        {mode === 'edit' && (
          <div className="border-t border-line pt-[1.6rem]">
            <FormField label="수강 상태">
              <Select options={STATUS_OPTIONS} {...register('status')} />
            </FormField>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default StudentFormModal;
