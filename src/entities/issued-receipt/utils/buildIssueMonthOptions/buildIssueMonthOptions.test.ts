import type { IssuedReceipt } from '../../model';

import { buildIssueMonthOptions } from './buildIssueMonthOptions';

const receipt = (issueYearMonth: string): IssuedReceipt => ({ issueYearMonth }) as unknown as IssuedReceipt;

describe('buildIssueMonthOptions', () => {
  it('발급분이 없어도 맨 앞 "전체 연월"(value \'\') 옵션을 둔다', () => {
    expect(buildIssueMonthOptions([])).toEqual([{ value: '', label: '전체 연월' }]);
  });

  it('distinct issueYearMonth를 최신순으로 나열하고 formatPeriod 라벨을 붙인다', () => {
    const options = buildIssueMonthOptions([receipt('2026-05'), receipt('2026-06'), receipt('2026-05')]);

    expect(options).toEqual([
      { value: '', label: '전체 연월' },
      { value: '2026-06', label: '2026년 6월' },
      { value: '2026-05', label: '2026년 5월' },
    ]);
  });
});
