import { motion, useReducedMotion } from 'motion/react';
import { useForm } from 'react-hook-form';

import type { UpsertAcademyInput } from '@entities/academy';
import { PageHead } from '@shared/ui';

import { AcademyInfoSection } from '../AcademyInfoSection';
import { AccountSection } from '../AccountSection';
import { SignatureSection } from '../SignatureSection';

const SettingsPage = () => {
  const shouldReduceMotion = useReducedMotion();

  // 임시 폼 — 02-01에서 서버값·useSettingsForm으로 교체
  const {
    register,
    formState: { errors },
  } = useForm<UpsertAcademyInput>({
    mode: 'onTouched',
    defaultValues: { name: '', ownerName: '', bizNo: '', tel: '', address: '' },
  });

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[72rem]"
    >
      <PageHead title="설정" subtitle="학원 정보와 발급 주체 정보를 관리해요." />

      <AcademyInfoSection register={register} errors={errors} />
      <SignatureSection />
      <AccountSection ownerName="" />

      {/* 스티키 저장 바 자리: 02-02 */}
    </motion.section>
  );
};

export default SettingsPage;
