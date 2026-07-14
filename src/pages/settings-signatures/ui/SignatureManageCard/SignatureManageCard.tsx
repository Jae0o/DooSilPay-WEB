import { useBreakpoint } from '@shared/hooks';
import { Button, Card, EditIcon, ImageIcon, TrashIcon, UploadIcon } from '@shared/ui';

import type { SignatureManageCardProps } from './SignatureManageCard.type';

const PREVIEW_CLASS =
  'grid place-items-center rounded-md border-[0.15rem] border-dashed border-line-2 bg-surface-2 text-ink-3';

const SignatureManageCard = ({ signatureUrl, cacheKey, uploadAction, deleteAction }: SignatureManageCardProps) => {
  const isMobile = useBreakpoint();

  const registered = Boolean(signatureUrl);
  const statusText = registered ? '서명 이미지가 등록되어 있어요' : '등록된 서명 이미지가 없어요';
  const uploadLabel = registered ? '다시 업로드' : '업로드';

  // downloadURL은 이미 ?alt=media&token=... 쿼리를 가짐 → 캐시버스팅은 &로 이어붙여야 token이 오염되지 않는다
  const previewSrc = `${signatureUrl}${signatureUrl?.includes('?') ? '&' : '?'}v=${cacheKey}`;

  const preview = registered ? (
    <img src={previewSrc} alt="서명" className="h-full w-full object-contain p-[0.8rem]" />
  ) : (
    <ImageIcon size={isMobile ? '3.2rem' : '2.8rem'} />
  );

  const uploadSlot =
    uploadAction ??
    (isMobile ? (
      <Button variant="neutral" fullWidth icon={<UploadIcon size="1.8rem" />} disabled>
        {uploadLabel}
      </Button>
    ) : (
      <Button variant="neutral" size="sm" icon={<UploadIcon size="1.8rem" />} disabled>
        {uploadLabel}
      </Button>
    ));

  const deleteSlot = registered
    ? (deleteAction ?? (
        <Button
          variant="ghost"
          fullWidth={isMobile}
          size={isMobile ? undefined : 'sm'}
          icon={<TrashIcon size="1.8rem" />}
          disabled
        >
          삭제
        </Button>
      ))
    : null;

  return (
    <Card pad="2.8rem">
      <div className="flex items-start gap-[1.2rem]">
        <div className="grid h-[3.8rem] w-[3.8rem] shrink-0 place-items-center rounded-md bg-point-weak text-point">
          <EditIcon size="1.9rem" />
        </div>
        <div>
          <div className="text-[1.7rem] font-bold">서명 / 인 이미지</div>
          <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">영수증 하단 발급 주체 서명란에 표시돼요.</div>
        </div>
      </div>

      {isMobile ? (
        <div className="mt-[1.8rem] flex flex-col gap-[1.4rem]">
          <div>
            <div className="font-semibold">{statusText}</div>
            <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">PNG 권장 · 배경 투명 이미지</div>
          </div>
          <div className={`${PREVIEW_CLASS} h-[13.2rem] w-full`}>{preview}</div>
          {uploadSlot}
          {deleteSlot}
        </div>
      ) : (
        <div className="mt-[1.8rem] flex items-center gap-[1.8rem]">
          <div className={`${PREVIEW_CLASS} h-[9.2rem] w-[9.2rem] shrink-0`}>{preview}</div>
          <div className="flex-1">
            <div className="font-semibold">{statusText}</div>
            <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">PNG 권장 · 배경 투명 이미지</div>
            <div className="mt-[1.2rem] flex gap-[0.8rem]">
              {uploadSlot}
              {deleteSlot}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SignatureManageCard;
