import { motion, useReducedMotion } from 'motion/react';
import { useParams } from 'react-router';

import { AsyncBoundary } from '@shared/ui';

import { IssueReceiptSkeleton } from '../IssueReceiptSkeleton';

import IssueReceiptContent from './IssueReceiptContent';

const IssueReceiptPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const { paymentId = '' } = useParams();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-[2.4rem] py-[2.8rem]"
    >
      <AsyncBoundary errorSize="lg" skeleton={<IssueReceiptSkeleton />} resetKeys={[paymentId]}>
        <IssueReceiptContent paymentId={paymentId} />
      </AsyncBoundary>
    </motion.section>
  );
};

export default IssueReceiptPage;
