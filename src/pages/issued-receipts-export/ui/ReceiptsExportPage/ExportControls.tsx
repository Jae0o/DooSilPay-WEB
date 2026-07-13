import type { IssuedReceipt } from '@entities/issued-receipt';
import { Card, FormField, Select } from '@shared/ui';
import { formatPeriod, zeroPad } from '@shared/utils';

interface ExportControlsProps {
  months: string[];
  month: string;
  onMonthChange: (month: string) => void;
  monthRows: IssuedReceipt[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  allOn: boolean;
  chosenCount: number;
  pageCount: number;
}

// 좌측 컨트롤 — 대상 월 · 전체 선택/해제 · 개별 체크리스트 · 선택 요약
const ExportControls = ({
  months,
  month,
  onMonthChange,
  monthRows,
  selected,
  onToggle,
  onToggleAll,
  allOn,
  chosenCount,
  pageCount,
}: ExportControlsProps) => (
  <>
    <Card pad="2rem">
      <FormField label="대상 월">
        <Select
          value={month}
          onChange={(event) => onMonthChange(event.target.value)}
          options={
            months.length > 0
              ? months.map((m) => ({ value: m, label: formatPeriod(m) }))
              : [{ value: month, label: formatPeriod(month) }]
          }
        />
      </FormField>

      <div className="mt-[1.8rem] mb-[1rem] flex items-center justify-between">
        <span className="text-[1.4rem] font-semibold whitespace-nowrap text-ink-2">발급분 {monthRows.length}건</span>

        <button type="button" onClick={onToggleAll} className="text-[1.4rem] font-semibold text-point">
          {allOn ? '전체 해제' : '전체 선택'}
        </button>
      </div>

      <div className="flex max-h-[28rem] flex-col gap-[0.4rem] overflow-y-auto">
        {monthRows.map((receipt) => (
          <label
            key={receipt.id}
            className="flex cursor-pointer items-center gap-[1rem] rounded-sm px-[0.6rem] py-[0.8rem]"
          >
            <input
              type="checkbox"
              checked={selected.has(receipt.id)}
              onChange={() => onToggle(receipt.id)}
              className="size-[1.7rem] accent-point"
            />

            <span className="tnum w-[3rem] text-[1.3rem] font-bold text-point">{zeroPad(receipt.seq, 3)}</span>

            <span className="flex-1 text-[1.4rem] font-semibold">{receipt.studentSnapshot.name}</span>
          </label>
        ))}
      </div>
    </Card>

    <Card pad="1.8rem" className="bg-point-weak" style={{ border: 'none' }}>
      <div className="mb-[0.6rem] flex items-center justify-between gap-[1rem]">
        <span className="text-[1.4rem] font-semibold whitespace-nowrap text-point-strong">선택</span>
        <span className="tnum font-extrabold whitespace-nowrap text-point-strong">{chosenCount}장</span>
      </div>

      <div className="flex items-center justify-between gap-[1rem]">
        <span className="text-[1.4rem] font-semibold whitespace-nowrap text-point-strong">출력 페이지</span>
        <span className="tnum font-extrabold whitespace-nowrap text-point-strong">{pageCount}쪽 · 2×2</span>
      </div>
    </Card>
  </>
);

export default ExportControls;
