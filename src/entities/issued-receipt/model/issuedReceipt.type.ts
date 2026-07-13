import type { OtherFee } from '@entities/payment';

// §2.1 실코드 그대로 (OtherFee는 payment 인터페이스 재사용 — 백엔드 동일)
export interface StudentSnapshot {
  registrationNo: number;
  name: string;
  birthDate: string; // YYYY-MM-DD — 발급 필수 (IR-3)
  subjectName: string; // 발급 시 확정된 교습과정
}

export interface AcademySnapshot {
  name: string; // 필수 (IR-3)
  ownerName: string; // 필수 (IR-3)
  bizNo?: string;
  tel?: string;
  address?: string;
  signatureUrl?: string; // 없으면 서식 "(인)" placeholder (IR-3)
}

export interface IssuedReceipt {
  id: string;
  issueYearMonth: string; // 채번 기준 연월 YYYY-MM
  seq: number; // 월 내 순번 1~. 삭제 재정렬로 가변 (E1)
  paymentId: string; // FK → Payment (1:1, E4)
  studentSnapshot: StudentSnapshot;
  period: string; // 연월(분기) 표기용 YYYY-MM
  tuitionFee: number; // ≥ 0 (E3 — 0원 발급 허용)
  otherFees: OtherFee[]; // 0~3
  issuedDate: string; // YYYY-MM-DD (E7)
  academy: AcademySnapshot;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// 표시번호 YYYY-MM-NNN·합계는 저장 안 됨 — FE 파생(formatReceiptNo, tuitionFee + Σ otherFees).

// EP-2 POST — 생략 필드는 서버가 Payment 값·오늘로 채움. otherFees 생략 = body 키 제외(V1-1)
export interface IssueReceiptInput {
  paymentId: string;
  subjectName?: string;
  tuitionFee?: number;
  otherFees?: OtherFee[];
  issuedDate?: string;
}

// EP-3 PUT — 4필드 전부 필수 (E6 — FE가 프리필 후 전체 전송)
export interface UpdateIssuedReceiptInput {
  subjectName: string;
  tuitionFee: number;
  otherFees: OtherFee[];
  issuedDate: string;
}

export interface ListIssuedReceiptsParams {
  period?: string; // YYYY-MM (RW-8)
}

export interface ListIssuedReceiptsResult {
  items: IssuedReceipt[]; // 서버 정렬: issueYearMonth desc, seq desc
  total: number;
}
