// 'YYYY-MM' -> 'YYYY년 M월'
export const formatPeriod = (period: string): string => {
  const [year, month] = period.split('-');

  return `${year}년 ${Number(month)}월`;
};
