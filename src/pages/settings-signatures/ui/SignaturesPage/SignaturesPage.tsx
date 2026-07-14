import { motion } from 'motion/react';
import { NavLink } from 'react-router';

import type { AcademyProfile } from '@entities/academy';
import { useGetAcademyQuery } from '@entities/academy';
import { ArrowLeftIcon, PageHead } from '@shared/ui';

import { SignatureManageCard } from '../SignatureManageCard';
import { SignatureSummaryCard } from '../SignatureSummaryCard';

// academy 로드 후 마운트 — signatureUrl/updatedAt 안전 (SettingsPage Content 위임 관례)
const SignaturesContent = ({ academy }: { academy: AcademyProfile }) => (
  <motion.section className="mx-auto max-w-[72rem]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
    <PageHead
      back={
        <NavLink
          to="/settings/academy"
          className="inline-flex items-center gap-[0.4rem] whitespace-nowrap text-[1.4rem] font-semibold text-ink-3"
        >
          <ArrowLeftIcon size="1.6rem" /> 설정
        </NavLink>
      }
      title="서명 관리"
      subtitle="영수증 하단 발급 주체 서명란에 사용되는 이미지를 관리해요."
    />

    <SignatureSummaryCard signatureUrl={academy.signatureUrl} />
    <SignatureManageCard signatureUrl={academy.signatureUrl} cacheKey={academy.updatedAt} />
  </motion.section>
);

const SignaturesPage = () => {
  const { data: academy } = useGetAcademyQuery();

  // 가드가 academyPending 동안 캐시 보장 (SettingsPage 동일)
  if (!academy) return null;

  return <SignaturesContent academy={academy} />;
};

export default SignaturesPage;
