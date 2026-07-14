import { useNavigate } from 'react-router';

import { useBreakpoint } from '@shared/hooks';
import { Button, Card, EditIcon, ImageIcon } from '@shared/ui';

import { SettingsSectionTitle } from '../SettingsSectionTitle';

import type { SignatureSectionProps } from './SignatureSection.type';

const PREVIEW_CLASS =
  'grid place-items-center rounded-md border-[0.15rem] border-dashed border-line-2 bg-surface-2 text-ink-3';

const SignatureSection = ({ signatureUrl, cacheKey }: SignatureSectionProps) => {
  const isMobile = useBreakpoint();
  const navigate = useNavigate();

  const statusText = signatureUrl ? '서명 이미지가 등록되어 있어요' : '등록된 서명 이미지가 없어요';

  return (
    <Card pad="2.8rem" className="mb-[1.6rem]">
      <SettingsSectionTitle
        icon={<EditIcon size="1.9rem" />}
        title="서명 / 인 이미지"
        desc="영수증 하단 발급 주체 서명란에 표시돼요."
      />

      {isMobile ? (
        <div className="mt-[1.8rem] flex flex-col gap-[1.4rem]">
          <div>
            <div className="font-semibold">{statusText}</div>
            <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">PNG 권장 · 배경 투명 이미지</div>
          </div>
          <div className={`${PREVIEW_CLASS} h-[13.2rem] w-full`}>
            {signatureUrl ? (
              <img
                src={`${signatureUrl}?v=${cacheKey}`}
                alt="서명"
                className="h-full w-full object-contain p-[0.8rem]"
              />
            ) : (
              <ImageIcon size="3.2rem" />
            )}
          </div>
          <Button
            variant="neutral"
            fullWidth
            icon={<EditIcon size="1.8rem" />}
            onClick={() => navigate('/settings/signatures')}
          >
            서명 관리
          </Button>
        </div>
      ) : (
        <div className="mt-[1.8rem] flex items-center gap-[1.8rem]">
          <div className={`${PREVIEW_CLASS} h-[9.2rem] w-[9.2rem] shrink-0`}>
            {signatureUrl ? (
              <img
                src={`${signatureUrl}?v=${cacheKey}`}
                alt="서명"
                className="h-full w-full object-contain p-[0.8rem]"
              />
            ) : (
              <ImageIcon size="2.8rem" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{statusText}</div>
            <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">PNG 권장 · 배경 투명 이미지</div>
            <div className="mt-[1.2rem] flex gap-[0.8rem]">
              <Button
                variant="neutral"
                size="sm"
                icon={<EditIcon size="1.8rem" />}
                onClick={() => navigate('/settings/signatures')}
              >
                서명 관리
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SignatureSection;
