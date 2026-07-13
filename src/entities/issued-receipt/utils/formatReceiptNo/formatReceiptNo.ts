import { zeroPad } from '@shared/utils';

// 표시번호 YYYY-MM-NNN (월 내 순번 zero-pad 3) — 저장 안 되는 FE 파생값 (E1)
export const formatReceiptNo = (issueYearMonth: string, seq: number): string => `${issueYearMonth}-${zeroPad(seq, 3)}`;
