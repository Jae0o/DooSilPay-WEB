import { useDeleteIssuedReceiptMutation } from '@entities/issued-receipt';
import { useToast } from '@shared/hooks';

import type { UseDeleteIssuedReceiptParams } from './useDeleteIssuedReceipt.type';

const useDeleteIssuedReceipt = ({ receiptId, onClose }: UseDeleteIssuedReceiptParams) => {
  const show = useToast();
  const remove = useDeleteIssuedReceiptMutation();

  const onConfirm = () =>
    remove.mutate(receiptId, {
      onSuccess: () => {
        show({ message: '교부영수증을 삭제했어요.', variant: 'success' });
        onClose();
      },
      onError: () => show({ message: '삭제에 실패했어요.', variant: 'error' }),
    });

  return { onConfirm, isPending: remove.isPending };
};

export default useDeleteIssuedReceipt;
