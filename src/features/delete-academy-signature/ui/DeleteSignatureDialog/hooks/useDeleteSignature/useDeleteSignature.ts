import { useDeleteSignatureMutation } from '@entities/academy';
import { useToast } from '@shared/hooks';

import type { UseDeleteSignatureParams } from './useDeleteSignature.type';

const useDeleteSignature = ({ onClose }: UseDeleteSignatureParams) => {
  const show = useToast();
  const remove = useDeleteSignatureMutation();

  const onConfirm = () =>
    remove.mutate(undefined, {
      onSuccess: () => {
        show({ message: '서명 이미지를 삭제했어요.', variant: 'success' });
        onClose();
      },
      onError: () => show({ message: '삭제에 실패했어요.', variant: 'error' }),
    });

  return { onConfirm, isPending: remove.isPending };
};

export default useDeleteSignature;
