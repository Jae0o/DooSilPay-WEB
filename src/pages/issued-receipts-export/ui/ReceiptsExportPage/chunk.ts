// 배열을 size 단위로 분할 (A4 2x2 페이지 묶음용)
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];

  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));

  return out;
};
