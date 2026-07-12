import { AsyncBoundary, Card } from '@shared/ui';
import { zeroPad } from '@shared/utils';

import SummaryFigures from './SummaryFigures';
import SummaryFiguresSkeleton from './SummaryFiguresSkeleton';

const MonthSummary = () => {
  const now = new Date();
  const label = `${now.getFullYear()}년 ${now.getMonth() + 1}월 수납 현황`;
  const period = `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}`;

  return (
    <Card pad="2.6rem" className="mb-[2rem]">
      <p className="text-[1.4rem] font-semibold text-ink-3">{label}</p>

      {/* period는 렌더 시점 고정값 → resetKeys 불필요. 라벨 제외 카드 내부 전체가 한 경계 */}
      <AsyncBoundary errorSize="sm" skeleton={<SummaryFiguresSkeleton />}>
        <SummaryFigures period={period} />
      </AsyncBoundary>
    </Card>
  );
};

export default MonthSummary;
