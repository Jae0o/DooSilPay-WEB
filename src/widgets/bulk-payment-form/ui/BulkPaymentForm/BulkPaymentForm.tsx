import { useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { buildPeriodOptions } from '@entities/payment';
import { useBreakpoint } from '@shared/hooks';
import { AlertIcon, Button, Card, FormField, PlusIcon, Select } from '@shared/ui';

import { BulkPaymentRowFields } from '../BulkPaymentRowFields';
import { BulkSaveBar } from '../BulkSaveBar';
import { OtherFeesModal } from '../OtherFeesModal';

import { isRowValid, rowTotal, useBulkPaymentForm } from './hooks';

const BulkPaymentForm = () => {
  const isMobile = useBreakpoint();
  const navigate = useNavigate();
  const {
    register,
    control,
    fields,
    studentOpts,
    period,
    tried,
    isPending,
    addRow,
    duplicateRow,
    removeRow,
    pickStudent,
    onPeriodChange,
    setOtherFees,
    getOtherFees,
    submit,
  } = useBulkPaymentForm();
  const periodOptions = useMemo(() => buildPeriodOptions(), []);
  const [otherFeesRow, setOtherFeesRow] = useState<number | null>(null);

  // 저장 바 파생 — 유효 행 건수·합계(P11 — 훅 아님, useWatch 파생)
  const watchedRows = useWatch({ control, name: 'rows' });
  const validRows = watchedRows.filter(isRowValid);
  const validCount = validRows.length;
  const grandTotal = validRows.reduce((sum, row) => sum + rowTotal(row), 0);

  const rowList = fields.map((field, index) => (
    <BulkPaymentRowFields
      key={field.id}
      index={index}
      register={register}
      control={control}
      studentOpts={studentOpts}
      isMobile={isMobile}
      tried={tried}
      canRemove={fields.length > 1}
      onPickStudent={(studentId) => pickStudent(index, studentId)}
      onDuplicate={() => duplicateRow(index)}
      onRemove={() => removeRow(index)}
      onOpenOtherFees={() => setOtherFeesRow(index)}
    />
  ));

  return (
    <div className="flex flex-col gap-[1.6rem]">
      {/* 상단 연월 카드 — 전 행 공통, 변경 시 선택된 행 예정일 재계산 */}
      <Card pad="2rem">
        <div className="flex flex-wrap items-start gap-[1.8rem]">
          <FormField label="대상 연월" hint="모든 행에 함께 적용돼요." className="w-[22rem]">
            <Select value={period} options={periodOptions} onChange={(e) => onPeriodChange(e.target.value)} />
          </FormField>

          {tried && validCount === 0 && (
            <div className="flex items-center gap-[0.4rem] text-[1.4rem] font-semibold text-danger">
              <AlertIcon size="1.6rem" /> 저장할 유효한 행이 없어요.
            </div>
          )}
        </div>
      </Card>

      {/* 행 목록 — 데스크탑 그리드 / 모바일 카드(768px 전환) */}
      {isMobile ? (
        <div className="flex flex-col gap-[1.2rem]">
          {rowList}

          <Button variant="neutral" fullWidth icon={<PlusIcon size="1.8rem" />} onClick={addRow}>
            행 추가
          </Button>
        </div>
      ) : (
        <Card pad="0">
          {rowList}

          <div className="border-t border-line p-[1.2rem]">
            <Button variant="ghost" icon={<PlusIcon size="1.8rem" />} onClick={addRow}>
              행 추가
            </Button>
          </div>
        </Card>
      )}

      <BulkSaveBar
        validCount={validCount}
        grandTotal={grandTotal}
        isPending={isPending}
        onSubmit={submit}
        onCancel={() => navigate('/students')}
      />

      {otherFeesRow !== null && (
        <OtherFeesModal
          initial={getOtherFees(otherFeesRow)}
          onClose={() => setOtherFeesRow(null)}
          onSave={(items) => {
            setOtherFees(otherFeesRow, items);
            setOtherFeesRow(null);
          }}
        />
      )}
    </div>
  );
};

export default BulkPaymentForm;
