import type { SelectOption } from '@shared/ui';
import { formatPeriod } from '@shared/utils';

import type { IssuedReceipt } from '../../model';

const ALL_OPTION: SelectOption = { value: '', label: '전체 연월' }; // RW-7

// 발급분의 distinct issueYearMonth를 최신순 + 맨 앞 "전체 연월"(value '') — 목록 월 필터용
export const buildIssueMonthOptions = (receipts: IssuedReceipt[]): SelectOption[] => {
  const months = [...new Set(receipts.map((receipt) => receipt.issueYearMonth))].sort((a, b) => b.localeCompare(a));

  return [ALL_OPTION, ...months.map((month) => ({ value: month, label: formatPeriod(month) }))];
};
