import { formatPeriod, zeroPad } from '@shared/utils';

// 디자인 stPeriods(): 현재월 기준 +1 ~ −2, 최신이 위. 결제 등록·수정·벌크 공용(소비처 2곳 — utils 승격)
const PERIOD_OFFSETS = [1, 0, -1, -2];

export const buildPeriodOptions = () => {
  const now = new Date();

  return PERIOD_OFFSETS.map((offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const value = `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}`;

    return { value, label: formatPeriod(value) };
  });
};
