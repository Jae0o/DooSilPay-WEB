import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { type BulkPaymentRow, dueDateFor, useBulkCreatePaymentsMutation } from '@entities/payment';
import { useStudentsQuery } from '@entities/student';
import { useToast } from '@shared/hooks';
import { zeroPad } from '@shared/utils';

import type { BulkPaymentFormValues, BulkPaymentRowValues } from './useBulkPaymentForm.type';

const MAX_ROWS = 50; // 스키마 상한(1~50행)

const currentPeriod = () => {
  const now = new Date();

  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}`;
};

const emptyRow = (): BulkPaymentRowValues => ({
  studentId: '',
  subjectName: '',
  dueDate: '',
  tuitionFee: '',
  otherFees: [],
  method: 'transfer', // 디자인 makeRow 기본값
});

// 파생 순수 함수 — 저장 바(합계·건수)·행 하이라이트 공용
export const rowTotal = (row: BulkPaymentRowValues) =>
  Number(row.tuitionFee || 0) + row.otherFees.reduce((sum, fee) => sum + (Number(fee.amount) || 0), 0);

export const isRowValid = (row: BulkPaymentRowValues) =>
  Boolean(row.studentId && row.subjectName.trim() && row.tuitionFee); // P5 — dueDate 제외

export const isRowFilled = (row: BulkPaymentRowValues) =>
  Boolean(row.studentId || row.tuitionFee || row.otherFees.length);

// 유효 행 → 요청 행 매핑(빈 문자열 → null, 완성 기타경비만 ≤3)
const toBulkRow = (row: BulkPaymentRowValues): BulkPaymentRow => ({
  studentId: row.studentId,
  subjectName: row.subjectName.trim(),
  tuitionFee: Number(row.tuitionFee),
  otherFees: row.otherFees
    .filter((fee) => fee.label.trim() && fee.amount)
    .slice(0, 3)
    .map((fee) => ({ label: fee.label.trim(), amount: Number(fee.amount) })),
  dueDate: row.dueDate || null,
  method: row.method || null,
});

const useBulkPaymentForm = () => {
  const show = useToast();
  const navigate = useNavigate();
  const bulk = useBulkCreatePaymentsMutation();
  const { data } = useStudentsQuery({ status: 'active', limit: 100 }); // 위젯 내부 조회(suspense) — 페이지 경계가 수신
  const students = data.items;

  const [tried, setTried] = useState(false); // 제출 시도 후 오류 행 하이라이트 활성

  const { register, control, getValues, setValue } = useForm<BulkPaymentFormValues>({
    mode: 'onTouched',
    defaultValues: { period: currentPeriod(), rows: [emptyRow(), emptyRow(), emptyRow()] }, // 디자인 초기 3행
  });

  const { fields, append, insert, remove } = useFieldArray({ control, name: 'rows' });
  const period = useWatch({ control, name: 'period' });

  const studentOpts = students.map((student) => ({
    value: student.id,
    label: student.subjectName ? `${student.name} · ${student.subjectName}` : student.name,
  }));

  const guardMax = () => {
    if (fields.length < MAX_ROWS) return true;

    show({ message: `행은 최대 ${MAX_ROWS}개까지 추가할 수 있어요.`, variant: 'error' });

    return false;
  };

  const addRow = () => {
    if (guardMax()) append(emptyRow());
  };

  const duplicateRow = (index: number) => {
    if (guardMax()) insert(index + 1, getValues(`rows.${index}`));
  };

  const removeRow = (index: number) => {
    if (fields.length > 1) remove(index); // 마지막 1행은 삭제 불가
  };

  // 수강생 선택 시 과목·교습비·예정일 prefill(디자인 onPickStudent)
  const pickStudent = (index: number, studentId: string) => {
    const student = students.find((s) => s.id === studentId);

    setValue(`rows.${index}.studentId`, studentId);
    setValue(`rows.${index}.subjectName`, student?.subjectName ?? '');
    setValue(`rows.${index}.tuitionFee`, student ? String(student.monthlyFee) : '');
    setValue(`rows.${index}.dueDate`, student?.paymentDay ? dueDateFor(getValues('period'), student.paymentDay) : '');
  };

  // 연월 변경 → 수강생 선택된 전 행의 예정일 재계산(디자인 L70~71)
  const onPeriodChange = (next: string) => {
    setValue('period', next);

    getValues('rows').forEach((row, index) => {
      const student = students.find((s) => s.id === row.studentId);

      if (student?.paymentDay) setValue(`rows.${index}.dueDate`, dueDateFor(next, student.paymentDay));
    });
  };

  const setOtherFees = (index: number, items: BulkPaymentRowValues['otherFees']) =>
    setValue(`rows.${index}.otherFees`, items);
  const getOtherFees = (index: number) => getValues(`rows.${index}.otherFees`);

  // 유효 행만 배치 저장 → created 제거 · skipped 사유 표시(P6·PM-4, §8 — 전 행 skipped여도 201)
  const submit = () => {
    setTried(true);

    const filled = getValues('rows')
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => isRowFilled(row));
    const validEntries = filled.filter(({ row }) => isRowValid(row));

    // 필수 미입력(불완전) 행이 하나라도 있으면 저장 차단 — 빈 행은 무시
    if (filled.length !== validEntries.length) {
      show({ message: '필수 항목(수강생·교습과목·교습비)을 모두 입력해 주세요.', variant: 'error' });

      return;
    }

    if (validEntries.length === 0) return; // 상단 안내는 컴포넌트가 tried && validCount===0로 렌더

    validEntries.forEach(({ index }) => setValue(`rows.${index}.skippedReason`, undefined)); // 재제출 — 이전 사유 초기화

    bulk.mutate(
      { period: getValues('period'), rows: validEntries.map(({ row }) => toBulkRow(row)) },
      {
        onSuccess: ({ created, skipped }) => {
          const skippedReq = new Set(skipped.map((s) => s.index));

          // skipped: 요청 idx → 폼 idx 역산 후 사유 세팅
          skipped.forEach((s) => setValue(`rows.${validEntries[s.index].index}.skippedReason`, s.reason));

          // created: 해당 폼 행 제거(인덱스 밀림 방지 — 내림차순)
          validEntries
            .filter((_, reqIndex) => !skippedReq.has(reqIndex))
            .map(({ index }) => index)
            .sort((a, b) => b - a)
            .forEach((index) => remove(index));

          if (skipped.length === 0) {
            show({ message: `${created.length}건을 납부 완료로 등록했어요.`, variant: 'success' });
            navigate('/students');

            return;
          }

          show({
            message: `${created.length}건 저장 · ${skipped.length}건 실패 — 실패 행을 확인하세요.`,
            variant: 'error',
          });
        },
        onError: () => show({ message: '일괄 저장에 실패했어요.', variant: 'error' }),
      },
    );
  };

  return {
    register,
    control,
    fields,
    studentOpts,
    period,
    tried,
    isPending: bulk.isPending,
    addRow,
    duplicateRow,
    removeRow,
    pickStudent,
    onPeriodChange,
    setOtherFees,
    getOtherFees,
    submit,
  };
};

export default useBulkPaymentForm;
