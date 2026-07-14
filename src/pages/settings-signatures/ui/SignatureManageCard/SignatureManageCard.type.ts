import type { ReactNode } from 'react';

export interface SignatureManageCardProps {
  signatureUrl?: string;
  cacheKey: string; // SG12 — 프리뷰 캐시버스팅용(academy.updatedAt)
  uploadAction?: ReactNode; // 09-03 feature 컴포넌트로 교체 (미지정 시 placeholder disabled)
  deleteAction?: ReactNode; // 등록 시에만 렌더
}
