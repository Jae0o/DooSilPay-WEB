import { formatReceiptNo } from '@entities/issued-receipt';
import type { IssuedReceipt } from '@entities/issued-receipt';
import { zeroPad } from '@shared/utils';

const OTHER_COLS = 3; // 기타경비 3열 고정 (E2)

export interface ReceiptOtherCol {
  label: string;
  amountText: string; // 빈 칸(패딩 열)은 ''
}

export interface ReceiptViewModel {
  no: string;
  periodShort: string; // '26년 4월'
  regNo: string;
  name: string;
  birth: string;
  subject: string;
  tuitionText: string;
  others: ReceiptOtherCol[];
  issuedYY: string; // '26'
  issuedMonth: string; // '4'
  issuedDay: string; // '4'
  signatureUrl: string | null;
}

// 연월(분기) 'YYYY-MM' -> 'YY년 M월' (서식 표기)
const shortPeriod = (period: string): string => {
  const [year, month] = period.split('-');

  return `${year.slice(2)}년 ${Number(month)}월`;
};

// IssuedReceipt -> 원부 서식 표시용 flat view-model (기타경비 3열 패딩·발급일 분해 파생)
export const receiptVM = (receipt: IssuedReceipt): ReceiptViewModel => {
  const others: ReceiptOtherCol[] = receipt.otherFees
    .slice(0, OTHER_COLS)
    .map((fee) => ({ label: fee.label, amountText: fee.amount.toLocaleString('ko-KR') }));
  while (others.length < OTHER_COLS) others.push({ label: '', amountText: '' });

  const [issuedYear, issuedMonth, issuedDay] = receipt.issuedDate.split('-');

  return {
    no: formatReceiptNo(receipt.issueYearMonth, receipt.seq),
    periodShort: shortPeriod(receipt.period),
    regNo: zeroPad(receipt.studentSnapshot.registrationNo, 2),
    name: receipt.studentSnapshot.name,
    birth: receipt.studentSnapshot.birthDate.replaceAll('-', '.'),
    subject: receipt.studentSnapshot.subjectName,
    tuitionText: receipt.tuitionFee.toLocaleString('ko-KR'),
    others,
    issuedYY: issuedYear.slice(2),
    issuedMonth: String(Number(issuedMonth)),
    issuedDay: String(Number(issuedDay)),
    signatureUrl: receipt.academy.signatureUrl ?? null,
  };
};
