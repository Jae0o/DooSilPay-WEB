import { useMemo, useState } from 'react';

import { useIssuedReceiptsQuery } from '@entities/issued-receipt';
import { zeroPad } from '@shared/utils';

import A4Page from './A4Page';
import ExportControls from './ExportControls';
import ExportHeader from './ExportHeader';
import ExportPreview from './ExportPreview';
import { chunk } from './chunk';

const currentPeriod = () => {
  const now = new Date();

  return `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}`;
};

// 좌 컨트롤 + 우 미리보기 + 숨김 print 컨테이너 조립. 전체 발급분에서 월별 파생(§3.4).
const ExportBoard = () => {
  const { data } = useIssuedReceiptsQuery();

  const months = useMemo(
    () => [...new Set(data.items.map((receipt) => receipt.issueYearMonth))].sort((a, b) => b.localeCompare(a)),
    [data.items],
  );

  const [month, setMonth] = useState(() => months[0] ?? currentPeriod());

  const monthRows = useMemo(
    () => data.items.filter((receipt) => receipt.issueYearMonth === month).sort((a, b) => a.seq - b.seq),
    [data.items, month],
  );

  const [selected, setSelected] = useState<Set<string>>(() => new Set(monthRows.map((receipt) => receipt.id)));

  // 월 변경 시 해당 월 전체 선택으로 초기화 (V3-4) — 렌더 중 동기 조정(React 권장 패턴, setState-in-effect 회피)
  const [selectedMonth, setSelectedMonth] = useState(month);

  if (selectedMonth !== month) {
    setSelectedMonth(month);
    setSelected(new Set(monthRows.map((receipt) => receipt.id)));
  }

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

  const chosen = monthRows.filter((receipt) => selected.has(receipt.id));
  const allOn = chosen.length === monthRows.length && monthRows.length > 0;
  const pages = chunk(chosen, 4);

  // PDF 저장 파일명 = document.title — 인쇄 동안만 "{학원이름}-교부영수증-{YY.MM}"로 교체
  const doPrint = () => {
    const [year, monthNumber] = month.split('-');
    const academyName = chosen[0]?.academy.name ?? '';
    const prevTitle = document.title;

    document.title = `${academyName}-교부영수증-${year.slice(2)}.${monthNumber}`;
    document.body.classList.add('dp-printing');

    setTimeout(() => {
      window.print(); // 인쇄 대화상자가 닫힐 때까지 블로킹
      document.body.classList.remove('dp-printing');
      document.title = prevTitle;
    }, 60);
  };

  return (
    <>
      <ExportHeader chosenCount={chosen.length} onPrint={doPrint} />

      <div className="dp-noprint grid grid-cols-1 gap-[2rem] lg:grid-cols-[30rem_1fr]">
        <div className="static flex flex-col gap-[1.6rem] lg:sticky lg:top-[1.6rem]">
          <ExportControls
            months={months}
            month={month}
            onMonthChange={setMonth}
            monthRows={monthRows}
            selected={selected}
            onToggle={toggle}
            onToggleAll={() => setSelected(allOn ? new Set() : new Set(monthRows.map((receipt) => receipt.id)))}
            allOn={allOn}
            chosenCount={chosen.length}
            pageCount={pages.length}
          />
        </div>

        <ExportPreview chosen={chosen} pages={pages} />
      </div>

      <div className="dp-print-only">
        {pages.map((pg, pi) => (
          <A4Page key={pi} blocks={pg} pageNo={pi + 1} total={pages.length} />
        ))}
      </div>
    </>
  );
};

export default ExportBoard;
