// GET /students/summary?period= 응답 (ST-3 — 서버 집계, V2-2)
export interface StudentsSummary {
  period: string; // YYYY-MM
  activeCount: number; // 활성 원생 수 (모수)
  paidCount: number; // 해당 period paid 건수 (활성 원생만)
  collected: number; // paid 합계 금액
  ratio: number; // 반올림 % (서버 계산 — FE 재계산 금지)
}
