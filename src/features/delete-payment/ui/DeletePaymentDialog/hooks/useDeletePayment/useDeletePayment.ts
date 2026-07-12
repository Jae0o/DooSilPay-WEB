import { useDeletePaymentMutation } from '@entities/payment';
import { useToast } from '@shared/hooks';

import type { UseDeletePaymentParams } from './useDeletePayment.type';

const useDeletePayment = ({ paymentId, onClose }: UseDeletePaymentParams) => {
  const show = useToast();
  const remove = useDeletePaymentMutation();

  const onConfirm = () =>
    remove.mutate(paymentId, {
      onSuccess: () => {
        show({ message: '결제가 삭제되었어요.', variant: 'success' });
        onClose();
      },
      onError: () => show({ message: '삭제에 실패했어요.', variant: 'error' }),
    });

  return { onConfirm, isPending: remove.isPending };
};

export default useDeletePayment;
