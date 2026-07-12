import { useFieldArray, useForm } from 'react-hook-form';

import { Button, IconButton, Modal, PlusIcon, TextInput, TrashIcon } from '@shared/ui';

import type { OtherFeesModalProps } from './OtherFeesModal.type';

interface OtherFeesFormValues {
  items: { label: string; amount: string }[];
}

// 벌크 행 기타경비 편집(sm) — 확인 시 label·amount 모두 채운 항목만 반영(디자인 L185)
const OtherFeesModal = ({ initial, onClose, onSave }: OtherFeesModalProps) => {
  const { register, control, handleSubmit } = useForm<OtherFeesFormValues>({
    defaultValues: { items: initial },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const submit = handleSubmit(({ items }) => onSave(items.filter((item) => item.label.trim() && item.amount)));

  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="기타경비"
      subtitle="이름과 금액을 입력하세요 · 최대 3개"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" form="other-fees-form">
            확인
          </Button>
        </>
      }
    >
      <form id="other-fees-form" onSubmit={submit} className="flex flex-col gap-[1rem]">
        {fields.length === 0 && (
          <p className="py-[0.8rem] text-[1.4rem] text-ink-3">
            등록된 기타경비가 없어요. 교재비·모의고사비 등 항목을 추가하세요.
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-[0.8rem]">
            <TextInput className="flex-1" placeholder="항목명 (예: 교재비)" {...register(`items.${index}.label`)} />
            <TextInput
              className="w-[15rem]"
              type="number"
              suffix="원"
              placeholder="금액"
              {...register(`items.${index}.amount`)}
            />
            <IconButton label="항목 삭제" icon={<TrashIcon size="1.8rem" />} onClick={() => remove(index)} />
          </div>
        ))}

        {fields.length < 3 && (
          <Button
            type="button"
            variant="neutral"
            className="self-start"
            icon={<PlusIcon size="1.6rem" />}
            onClick={() => append({ label: '', amount: '' })}
          >
            항목 추가 ({fields.length}/3)
          </Button>
        )}
      </form>
    </Modal>
  );
};

export default OtherFeesModal;
