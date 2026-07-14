import { Badge, Card } from '@shared/ui';

import type { SignatureSummaryCardProps } from './SignatureSummaryCard.type';

const SignatureSummaryCard = ({ signatureUrl }: SignatureSummaryCardProps) => {
  const registered = Boolean(signatureUrl);

  return (
    <Card pad="2.8rem" className="mb-[1.6rem]">
      <div className="flex items-start justify-between gap-[1.6rem]">
        <div>
          <div className="font-semibold">
            {registered ? '서명 이미지가 등록되어 있어요' : '등록된 서명 이미지가 없어요'}
          </div>
          <div className="mt-[0.2rem] text-[1.4rem] text-ink-3">
            새로 발급하는 영수증부터 반영돼요 · 이미 발급된 영수증은 변하지 않아요
          </div>
        </div>

        <div className="shrink-0">
          {registered ? <Badge tone="ok">등록됨</Badge> : <Badge tone="muted">미등록</Badge>}
        </div>
      </div>
    </Card>
  );
};

export default SignatureSummaryCard;
