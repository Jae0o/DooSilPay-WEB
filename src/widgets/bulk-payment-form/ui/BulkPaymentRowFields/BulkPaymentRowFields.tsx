import { useWatch } from 'react-hook-form';

import { METHOD_LABEL, type PaymentMethod } from '@entities/payment';
import { SubjectSelectField } from '@entities/subject';
import { AlertIcon, Card, CopyIcon, FormField, IconButton, Select, TextInput, TrashIcon } from '@shared/ui';
import { cn, formatCurrency } from '@shared/utils';

import { isRowFilled, isRowValid, rowTotal } from '../BulkPaymentForm/hooks';
import type { BulkPaymentRowValues } from '../BulkPaymentForm/hooks';
import { OtherFeesCell } from '../OtherFeesCell';

import type { BulkPaymentRowFieldsProps } from './BulkPaymentRowFields.type';

const METHOD_OPTIONS = (Object.keys(METHOD_LABEL) as PaymentMethod[]).map((value) => ({
  value,
  label: METHOD_LABEL[value],
}));

const SKIPPED_LABEL: Record<NonNullable<BulkPaymentRowValues['skippedReason']>, string> = {
  DUPLICATE_PAYMENT: '이미 이 연월의 결제가 있어요',
  STUDENT_INACTIVE: '비활성 수강생이에요',
  STUDENT_NOT_FOUND: '수강생을 찾을 수 없어요',
};

const BulkPaymentRowFields = ({
  index,
  register,
  control,
  studentOpts,
  isMobile,
  tried,
  canRemove,
  onPickStudent,
  onDuplicate,
  onRemove,
  onOpenOtherFees,
}: BulkPaymentRowFieldsProps) => {
  const row = useWatch({ control, name: `rows.${index}` });
  const total = rowTotal(row);
  const bad = tried && isRowFilled(row) && !isRowValid(row); // 채웠으나 유효하지 않은 행
  const skipped = row.skippedReason;

  const actions = (
    <div className="flex gap-[0.2rem]">
      <IconButton label="행 복제" icon={<CopyIcon size="1.7rem" />} onClick={onDuplicate} />
      <IconButton label="행 삭제" icon={<TrashIcon size="1.7rem" />} disabled={!canRemove} onClick={onRemove} />
    </div>
  );

  const warning = skipped && (
    <div className="flex items-center gap-[0.4rem] text-[1.3rem] font-semibold text-danger">
      <AlertIcon size="1.6rem" /> {SKIPPED_LABEL[skipped]}
    </div>
  );

  const grid = (
    <div
      className={cn('grid gap-[1.2rem]', isMobile ? 'grid-cols-2' : 'grid-cols-[repeat(auto-fit,minmax(18.4rem,1fr))]')}
    >
      <FormField label="수강생" required>
        <Select
          value={row.studentId}
          placeholder="선택"
          options={studentOpts}
          onChange={(e) => onPickStudent(e.target.value)}
        />
      </FormField>

      <FormField label="결제 예정일">
        <TextInput type="date" {...register(`rows.${index}.dueDate`)} />
      </FormField>

      <SubjectSelectField
        label="교습과목"
        required
        placeholder="선택"
        emptyHint="설정 > 교습과목에서 먼저 등록해 주세요."
        current={row.subjectName}
        registration={register(`rows.${index}.subjectName`)}
      />

      <FormField label="교습비" required>
        <TextInput type="number" suffix="원" {...register(`rows.${index}.tuitionFee`)} />
      </FormField>

      <FormField label="결제수단">
        <Select options={METHOD_OPTIONS} {...register(`rows.${index}.method`)} />
      </FormField>

      <FormField label="기타경비 (0~3)">
        <OtherFeesCell otherFees={row.otherFees} onOpen={onOpenOtherFees} />
      </FormField>
    </div>
  );

  if (isMobile) {
    return (
      <Card pad="1.6rem" className={cn('flex flex-col gap-[1.2rem]', bad && 'border-danger')}>
        <div className="flex items-center justify-between">
          <span className="tnum text-[1.4rem] font-bold text-ink-3">행 {index + 1}</span>
          {actions}
        </div>

        {warning}
        {grid}

        <div className="flex justify-between border-t border-line pt-[0.8rem]">
          <span className="text-[1.3rem] text-ink-3">합계</span>
          <span className="tnum font-bold">{total ? formatCurrency(total) : '—'}</span>
        </div>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-[1.2rem] border-line px-[1.8rem] py-[1.6rem] [&:not(:first-child)]:border-t',
        bad && 'bg-danger-weak',
      )}
    >
      <div className="flex items-center gap-[1rem]">
        <span className="tnum text-[1.4rem] font-bold text-ink-3">행 {index + 1}</span>
        <div className="flex-1" />
        <span className="text-[1.3rem] text-ink-3">합계</span>
        <span className="tnum min-w-[8.8rem] text-right text-[1.5rem] font-extrabold">
          {total ? formatCurrency(total) : '—'}
        </span>
        {actions}
      </div>

      {warning}
      {grid}
    </div>
  );
};

export default BulkPaymentRowFields;
