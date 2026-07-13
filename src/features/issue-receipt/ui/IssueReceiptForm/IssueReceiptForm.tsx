import { useNavigate } from 'react-router';

import {
  AlertIcon,
  Button,
  Card,
  CheckIcon,
  EditIcon,
  EyeIcon,
  IconButton,
  PlusIcon,
  PrinterIcon,
  ReceiptIcon,
  TextField,
  TextInput,
  TrashIcon,
} from '@shared/ui';
import { formatPeriod, zeroPad } from '@shared/utils';
import { ReceiptTemplate } from '@widgets/receipt-template';

import type { IssueReceiptFormProps } from './IssueReceiptForm.type';
import { useIssueReceiptForm } from './hooks';

const AutoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="mb-[0.3rem] flex items-center gap-[0.6rem] text-[1.3rem] text-ink-3">
      {label}
      <span className="rounded-pill bg-point-weak px-[0.6rem] py-[0.1rem] text-[1.1rem] font-bold whitespace-nowrap text-point">
        자동
      </span>
    </div>
    <div className="tnum font-semibold">{value}</div>
  </div>
);

// features/issue-receipt — RHF·자동 필드·배너·발급/저장 뮤테이션을 담당. 페이지의 2컬럼 그리드에 Fragment로 좌/우를 채운다.
const IssueReceiptForm = ({
  payment,
  student,
  academy,
  existingReceipt,
  editing,
  onStartEdit,
  onCancelEdit,
  onIssued,
}: IssueReceiptFormProps) => {
  const navigate = useNavigate();
  const {
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
    studentSnapshot,
    noSignature,
    blockers,
  } = useIssueReceiptForm({ payment, student, academy, existingReceipt, onCancelEdit, onIssued });

  const readOnly = !editing;

  return (
    <>
      <div className="flex flex-col gap-[1.6rem]">
        {noSignature && (
          <div className="flex items-start gap-[1.2rem] rounded-md bg-warn-weak px-[1.6rem] py-[1.4rem]">
            <AlertIcon size="2rem" className="mt-[0.1rem] shrink-0 text-warn" />
            <p className="text-[1.4rem] leading-[1.5] text-ink-2">
              <b className="text-ink">서명/인 이미지가 등록되지 않았어요.</b> 영수증 하단 서명란이 비어 발급됩니다.{' '}
              <button type="button" className="font-semibold text-point" onClick={() => navigate('/settings/academy')}>
                설정에서 등록하기 →
              </button>
            </p>
          </div>
        )}

        {blockers.map((blocker) => (
          <div
            key={blocker.message}
            className="flex items-start gap-[1.2rem] rounded-md bg-danger-weak px-[1.6rem] py-[1.4rem]"
          >
            <AlertIcon size="2rem" className="mt-[0.1rem] shrink-0 text-danger" />
            <p className="text-[1.4rem] leading-[1.5] text-ink-2">
              <b className="text-ink">{blocker.message}</b>{' '}
              <button type="button" className="font-semibold text-point" onClick={() => navigate(blocker.to)}>
                {blocker.linkLabel}
              </button>
            </p>
          </div>
        ))}

        <Card pad="2.4rem">
          <div className="mb-[1.6rem] text-[1.6rem] font-bold">발급 정보</div>

          <div className="grid grid-cols-2 gap-x-[2.4rem] gap-y-[1.6rem]">
            <AutoField label="일련번호" value={receiptNo} />
            <AutoField label="등록번호" value={zeroPad(studentSnapshot.registrationNo, 2)} />
            <AutoField label="성명" value={studentSnapshot.name} />
            <AutoField
              label="생년월일"
              value={studentSnapshot.birthDate ? studentSnapshot.birthDate.replaceAll('-', '.') : '-'}
            />
            <AutoField
              label="연월(분기)"
              value={formatPeriod(existingReceipt ? existingReceipt.period : payment.period)}
            />
          </div>

          <form
            id="issue-receipt-form"
            onSubmit={submit}
            className="mt-[1.8rem] flex flex-col gap-[1.6rem] border-t border-line pt-[1.8rem]"
          >
            <div className="grid grid-cols-1 gap-[1.8rem] lg:grid-cols-2">
              <TextField
                label="교습과정"
                required
                placeholder="예) 중등 수학"
                hint={readOnly ? undefined : '영수증에 표기될 과정명이에요.'}
                error={errors.subjectName?.message}
                disabled={readOnly}
                {...register('subjectName', { required: '교습과정을 입력해 주세요.' })}
              />
              <TextField label="발급일" type="date" disabled={readOnly} {...register('issuedDate')} />
            </div>

            <div className="grid grid-cols-1 gap-[1.8rem] lg:grid-cols-2">
              <TextField
                label="교습비"
                required
                type="number"
                suffix="원"
                error={errors.tuitionFee?.message}
                disabled={readOnly}
                {...register('tuitionFee', { required: '교습비를 입력해 주세요.' })}
              />
              <div />
            </div>

            <div>
              <div className="mb-[0.8rem] flex items-center justify-between">
                <span className="text-[1.4rem] font-semibold text-ink-2">
                  기타경비 <span className="font-normal text-ink-3">(최대 3개)</span>
                </span>
                {!readOnly && fields.length < 3 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    icon={<PlusIcon size="1.6rem" />}
                    onClick={() => append({ label: '', amount: '' })}
                  >
                    항목 추가
                  </Button>
                )}
              </div>

              {fields.length === 0 ? (
                <p className="text-[1.3rem] text-ink-3">등록된 기타경비가 없어요.</p>
              ) : (
                <div className="flex flex-col gap-[0.8rem]">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-[0.8rem]">
                      <TextInput
                        className="flex-1"
                        placeholder="항목명 (예: 교재비)"
                        disabled={readOnly}
                        {...register(`otherFees.${index}.label`)}
                      />
                      <TextInput
                        className="w-[15rem]"
                        type="number"
                        suffix="원"
                        disabled={readOnly}
                        {...register(`otherFees.${index}.amount`)}
                      />
                      {!readOnly && (
                        <IconButton
                          label="기타경비 삭제"
                          icon={<TrashIcon size="1.8rem" />}
                          onClick={() => remove(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </Card>

        <div className="flex gap-[1rem]">
          {!existingReceipt ? (
            <>
              <Button variant="ghost" onClick={() => navigate(`/students/${student.id}`)}>
                취소
              </Button>
              <Button
                type="submit"
                form="issue-receipt-form"
                icon={<ReceiptIcon size="1.8rem" />}
                isLoading={isPending}
                disabled={blockers.length > 0}
              >
                교부영수증 발급
              </Button>
            </>
          ) : editing ? (
            <>
              <Button variant="ghost" onClick={cancelEdit}>
                취소
              </Button>
              <Button type="submit" form="issue-receipt-form" icon={<CheckIcon size="1.8rem" />} isLoading={isPending}>
                저장
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/issued-receipts')}>
                목록
              </Button>
              <Button
                variant="neutral"
                icon={<PrinterIcon size="1.8rem" />}
                onClick={() => navigate('/issued-receipts/export')}
              >
                PDF 변환
              </Button>
              <Button icon={<EditIcon size="1.8rem" />} onClick={onStartEdit}>
                수정
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-[1.6rem]">
        <div className="mb-[1rem] flex items-center gap-[0.6rem] text-[1.3rem] font-semibold text-ink-3">
          <EyeIcon size="1.6rem" /> 실시간 미리보기
        </div>
        <div className="grid place-items-center rounded-lg border border-line bg-bg p-[2.4rem]">
          <ReceiptTemplate data={draft} />
        </div>
      </div>
    </>
  );
};

export default IssueReceiptForm;
