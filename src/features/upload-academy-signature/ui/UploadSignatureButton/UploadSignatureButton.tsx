import { useRef } from 'react';
import type { ChangeEvent } from 'react';

import { useUploadSignatureMutation } from '@entities/academy';
import { useToast } from '@shared/hooks';
import { Button, UploadIcon } from '@shared/ui';

import type { UploadSignatureButtonProps } from './UploadSignatureButton.type';

const ACCEPT = 'image/png,image/jpeg';
const MAX_SIZE = 2 * 1024 * 1024;

const UploadSignatureButton = ({ hasSignature, fullWidth = false, size = 'md' }: UploadSignatureButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const show = useToast();
  const upload = useUploadSignatureMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // 같은 파일 재선택 허용

    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      show({ message: 'PNG 또는 JPG 이미지만 업로드할 수 있어요.', variant: 'warning' });

      return;
    }
    if (file.size > MAX_SIZE) {
      show({ message: '2MB 이하 이미지만 업로드할 수 있어요.', variant: 'warning' });

      return;
    }

    upload.mutate(file, {
      onSuccess: () =>
        show({ message: hasSignature ? '서명 이미지를 교체했어요.' : '서명 이미지를 등록했어요.', variant: 'success' }),
      onError: () => show({ message: '업로드에 실패했어요. 잠시 후 다시 시도해 주세요.', variant: 'error' }),
    });
  };

  return (
    <>
      <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={handleChange} />
      <Button
        variant="neutral"
        size={size}
        fullWidth={fullWidth}
        isLoading={upload.isPending}
        icon={<UploadIcon size="1.8rem" />}
        onClick={() => inputRef.current?.click()}
      >
        {hasSignature ? '다시 업로드' : '업로드'}
      </Button>
    </>
  );
};

export default UploadSignatureButton;
