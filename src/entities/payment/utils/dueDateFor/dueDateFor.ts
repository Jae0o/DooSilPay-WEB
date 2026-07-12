import { zeroPad } from '@shared/utils';

// period + 결제일 → YYYY-MM-DD. 말일 클램프(2월 31일 → 2월 말일). Design data.jsx dueDateFor 참조
export const dueDateFor = (period: string, day: number): string => {
  const [year, month] = period.split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();

  return `${period}-${zeroPad(Math.min(day, lastDay))}`;
};
