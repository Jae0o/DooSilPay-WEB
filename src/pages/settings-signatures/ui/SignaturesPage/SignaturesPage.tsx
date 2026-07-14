import { motion } from 'motion/react';
import { NavLink } from 'react-router';

import type { AcademyProfile } from '@entities/academy';
import { useGetAcademyQuery } from '@entities/academy';
import { DeleteSignatureDialog } from '@features/delete-academy-signature';
import { UploadSignatureButton } from '@features/upload-academy-signature';
import { useBreakpoint, useToggle } from '@shared/hooks';
import { ArrowLeftIcon, Button, PageHead, TrashIcon } from '@shared/ui';

import { SignatureManageCard } from '../SignatureManageCard';
import { SignatureSummaryCard } from '../SignatureSummaryCard';

// academy 로드 후 마운트 — signatureUrl/updatedAt 안전 (SettingsPage Content 위임 관례)
const SignaturesContent = ({ academy }: { academy: AcademyProfile }) => {
  const isMobile = useBreakpoint();
  const [deleteOpen, toggleDelete] = useToggle();

  return (
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
      <SignatureManageCard
        signatureUrl={academy.signatureUrl}
        cacheKey={academy.updatedAt}
        uploadAction={
          <UploadSignatureButton
            hasSignature={Boolean(academy.signatureUrl)}
            size={isMobile ? 'md' : 'sm'}
            fullWidth={isMobile}
          />
        }
        deleteAction={
          <Button
            variant="ghost"
            size={isMobile ? undefined : 'sm'}
            fullWidth={isMobile}
            icon={<TrashIcon size="1.8rem" />}
            onClick={toggleDelete}
          >
            삭제
          </Button>
        }
      />

      {deleteOpen && <DeleteSignatureDialog open={deleteOpen} onClose={toggleDelete} />}
    </motion.section>
  );
};

const SignaturesPage = () => {
  const { data: academy } = useGetAcademyQuery();

  // 가드가 academyPending 동안 캐시 보장 (SettingsPage 동일)
  if (!academy) return null;

  return <SignaturesContent academy={academy} />;
};

export default SignaturesPage;
