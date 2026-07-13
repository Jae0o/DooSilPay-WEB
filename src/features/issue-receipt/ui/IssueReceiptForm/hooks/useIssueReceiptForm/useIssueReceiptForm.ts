import { useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import type { AcademySnapshot, IssuedReceipt, StudentSnapshot } from '@entities/issued-receipt';
import {
  formatReceiptNo,
  useIssueReceiptMutation,
  useIssuedReceiptsQuery,
  useUpdateIssuedReceiptMutation,
} from '@entities/issued-receipt';
import type { OtherFee } from '@entities/payment';
import { getApiErrorCode } from '@shared/api';
import { useToast } from '@shared/hooks';

import type { IssueReceiptFormValues } from '../../IssueReceiptForm.type';

import type { IssueReceiptBlocker, UseIssueReceiptFormParams } from './useIssueReceiptForm.type';

const toDateStr = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// values → 서버 입력(순수): label·amount 둘 다 채운 행만 Number 변환 (§2.1 — 저장 안 되는 파생 아님, 실제 전송값)
// watch() 값은 DeepPartial(필드 옵셔널)이라 느슨한 타입도 받는다 — draft 계산·submit 양쪽에서 재사용
const cleanOtherFees = (otherFees: { label?: string; amount?: string }[]): OtherFee[] =>
  otherFees
    .filter((fee) => fee.label?.trim() && fee.amount)
    .map((fee) => ({ label: fee.label!.trim(), amount: Number(fee.amount) }));

// 조건부 마운트 없이 단일 라우트에서 신규/기존을 오가므로 defaultValues는 최초 1회 + 취소 시 reset()으로만 갱신
const buildDefaults = ({
  payment,
  existingReceipt,
}: Pick<UseIssueReceiptFormParams, 'payment' | 'existingReceipt'>): IssueReceiptFormValues => {
  if (existingReceipt) {
    return {
      subjectName: existingReceipt.studentSnapshot.subjectName,
      issuedDate: existingReceipt.issuedDate,
      tuitionFee: String(existingReceipt.tuitionFee),
      otherFees: existingReceipt.otherFees.map((fee) => ({ label: fee.label, amount: String(fee.amount) })),
    };
  }

  // 자동 채움(RW-13 prefill) — 교습비/기타경비는 분리 매핑, 합산 금지
  return {
    subjectName: payment.subjectName,
    issuedDate: toDateStr(new Date()),
    tuitionFee: String(payment.tuitionFee),
    otherFees: payment.otherFees.map((fee) => ({ label: fee.label, amount: String(fee.amount) })),
  };
};

const useIssueReceiptForm = ({
  payment,
  student,
  academy,
  existingReceipt,
  onCancelEdit,
  onIssued,
}: UseIssueReceiptFormParams) => {
  const show = useToast();
  const issue = useIssueReceiptMutation();
  const update = useUpdateIssuedReceiptMutation();
  const { data: receiptsData } = useIssuedReceiptsQuery(); // 캐시 히트(페이지에서 이미 조회) — 동월 count 산출용(RW-11)
  const isPending = issue.isPending || update.isPending;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueReceiptFormValues>({
    mode: 'onTouched',
    defaultValues: buildDefaults({ payment, existingReceipt }),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'otherFees' });
  const watched = useWatch({ control });

  const estimatedSeq = useMemo(
    () => receiptsData.items.filter((receipt) => receipt.issueYearMonth === payment.period).length + 1,
    [receiptsData.items, payment.period],
  );

  const issueYearMonth = existingReceipt ? existingReceipt.issueYearMonth : payment.period;
  const seq = existingReceipt ? existingReceipt.seq : estimatedSeq;
  const period = existingReceipt ? existingReceipt.period : payment.period;
  const receiptNo = formatReceiptNo(issueYearMonth, seq);

  const academySnapshot: AcademySnapshot = existingReceipt
    ? existingReceipt.academy
    : {
        name: academy?.name ?? '',
        ownerName: academy?.ownerName ?? '',
        bizNo: academy?.bizNo,
        tel: academy?.tel,
        address: academy?.address,
        signatureUrl: academy?.signatureUrl,
      };

  const studentSnapshot: StudentSnapshot = existingReceipt
    ? existingReceipt.studentSnapshot
    : {
        registrationNo: student.registrationNo,
        name: student.name,
        birthDate: student.birthDate ?? '',
        subjectName: '',
      };

  // 실시간 미리보기 draft — RHF watch 값 반영 (§3.3)
  const draft: IssuedReceipt = {
    id: existingReceipt?.id ?? '',
    issueYearMonth,
    seq,
    paymentId: payment.id,
    studentSnapshot: { ...studentSnapshot, subjectName: watched.subjectName ?? '' },
    period,
    tuitionFee: Number(watched.tuitionFee) || 0,
    otherFees: cleanOtherFees(watched.otherFees ?? []),
    issuedDate: watched.issuedDate ?? '',
    academy: academySnapshot,
    createdAt: existingReceipt?.createdAt ?? '',
    updatedAt: existingReceipt?.updatedAt ?? '',
  };

  const noSignature = !academySnapshot.signatureUrl;

  // RW-10 — 신규 발급에만 적용(EP-3 정정 저장은 학원/생년월일을 사용하지 않음)
  const blockers: IssueReceiptBlocker[] = [];
  if (!existingReceipt) {
    if (!student.birthDate) {
      blockers.push({
        message: '수강생의 생년월일이 등록되지 않았어요.',
        linkLabel: '수강생 정보 수정 →',
        to: `/students/${student.id}`,
      });
    }
    if (!academy?.name || !academy?.ownerName) {
      blockers.push({
        message: '학원 정보가 설정되지 않았어요.',
        linkLabel: '설정에서 등록하기 →',
        to: '/settings/academy',
      });
    }
  }

  const onError = (error: unknown) => {
    const code = getApiErrorCode(error);

    if (code === 'ALREADY_ISSUED') {
      show({ message: '이미 발급된 결제예요.', variant: 'error' });
      return;
    }
    if (code === 'ACADEMY_INCOMPLETE') {
      show({ message: '학원 정보를 먼저 등록해 주세요.', variant: 'error' });
      return;
    }
    if (code === 'STUDENT_BIRTHDATE_REQUIRED') {
      show({ message: '수강생의 생년월일을 먼저 등록해 주세요.', variant: 'error' });
      return;
    }
    show({ message: '저장에 실패했어요.', variant: 'error' });
  };

  const submit = handleSubmit((values) => {
    const otherFees = cleanOtherFees(values.otherFees);

    if (!existingReceipt) {
      issue.mutate(
        {
          paymentId: payment.id,
          subjectName: values.subjectName.trim(),
          tuitionFee: Number(values.tuitionFee),
          otherFees,
          issuedDate: values.issuedDate,
        },
        {
          onSuccess: () => {
            show({ message: '교부영수증을 발급했어요', variant: 'success' });
            onIssued();
          },
          onError,
        },
      );
      return;
    }

    update.mutate(
      {
        receiptId: existingReceipt.id,
        input: {
          subjectName: values.subjectName.trim(),
          tuitionFee: Number(values.tuitionFee),
          otherFees,
          issuedDate: values.issuedDate,
        },
      },
      {
        onSuccess: () => {
          show({ message: '교부영수증을 수정했어요', variant: 'success' });
          onCancelEdit();
        },
        onError,
      },
    );
  });

  // 수정 취소 — 편집분 폐기, 발급 당시 값으로 복원 후 보기 모드 복귀
  const cancelEdit = () => {
    reset(buildDefaults({ payment, existingReceipt }));
    onCancelEdit();
  };

  return {
    register,
    errors,
    fields,
    append,
    remove,
    isPending,
    submit,
    cancelEdit,
    draft,
    receiptNo,
    studentSnapshot, // 발급 정보 카드의 등록번호·성명·생년월일 표시용 — 기발급이면 스냅샷(발급 당시) 고정값
    noSignature,
    blockers,
  };
};

export default useIssueReceiptForm;
