import { motion, useReducedMotion } from 'motion/react';

import type { AcademyProfile } from '@entities/academy';
import { useGetAcademyQuery } from '@entities/academy';
import { Button, CheckIcon, PageHead } from '@shared/ui';

import { AcademyInfoSection } from '../AcademyInfoSection';
import { AccountSection } from '../AccountSection';
import { SettingsSaveBar } from '../SettingsSaveBar';
import { SignatureSection } from '../SignatureSection';
import { SubjectsSection } from '../SubjectsSection';

import { useSettingsForm } from './hooks';

// academy 로드 후 마운트 — defaultValues 안전 (StudentDetail Content 위임 관례)
const SettingsContent = ({ academy }: { academy: AcademyProfile }) => {
  const shouldReduceMotion = useReducedMotion();
  const { register, errors, isDirty, isPending, save, revert } = useSettingsForm({ academy });

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[72rem]"
    >
      <PageHead
        title="설정"
        subtitle="학원 정보와 발급 주체 정보를 관리해요."
        actions={
          <>
            {isDirty && (
              <Button variant="neutral" onClick={revert}>
                되돌리기
              </Button>
            )}
            <Button icon={<CheckIcon size="1.8rem" />} onClick={save} disabled={!isDirty} isLoading={isPending}>
              저장
            </Button>
          </>
        }
      />

      <AcademyInfoSection register={register} errors={errors} />
      <SignatureSection signatureUrl={academy.signatureUrl} />
      <AccountSection ownerName={academy.ownerName} />
      {/* 즉시 저장 — dirty/저장 바와 무관, 카드 내부 지역 경계(SJ3·SJ10) */}
      <SubjectsSection />

      {/* S9: 상단 액션과 동일한 save/revert 공유 — dirty 시에만 등장 */}
      {isDirty && <SettingsSaveBar isPending={isPending} onRevert={revert} onSave={save} />}
    </motion.section>
  );
};

const SettingsPage = () => {
  const { data: academy } = useGetAcademyQuery();

  // ProtectedRoute가 academyPending 동안 null 렌더 → 마운트 시 캐시 보장.
  // null(온보딩 리다이렉트 중)·undefined 방어만 (분석 §8·V2-1)
  if (!academy) return null;

  return <SettingsContent academy={academy} />;
};

export default SettingsPage;
