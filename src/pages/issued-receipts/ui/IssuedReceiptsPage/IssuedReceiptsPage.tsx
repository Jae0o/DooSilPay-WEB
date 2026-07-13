import { motion, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router';

import { AsyncBoundary, Button, PageHead, PrinterIcon, Skeleton } from '@shared/ui';

import { ReceiptListSkeleton } from '../ReceiptListSkeleton';

import ReceiptBoard from './ReceiptBoard';
import ReceiptTotalCount from './ReceiptTotalCount';

const IssuedReceiptsPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[2.4rem] py-[2.8rem]"
    >
      <PageHead
        title="교부영수증"
        subtitle={
          <AsyncBoundary errorSize="sm" skeleton={<Skeleton className="h-[1.4rem] w-[8rem]" />}>
            <ReceiptTotalCount />
          </AsyncBoundary>
        }
        actions={
          <Button icon={<PrinterIcon size="1.8rem" />} onClick={() => navigate('/issued-receipts/export')}>
            월별 PDF 변환
          </Button>
        }
      />

      <AsyncBoundary errorSize="md" skeleton={<ReceiptListSkeleton />}>
        <ReceiptBoard />
      </AsyncBoundary>
    </motion.section>
  );
};

export default IssuedReceiptsPage;
