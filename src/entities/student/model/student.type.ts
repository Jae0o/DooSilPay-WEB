export type StudentStatus = 'active' | 'inactive';

export interface Student {
  id: string;
  registrationNo: number;
  name: string;
  birthDate?: string; // YYYY-MM-DD
  subjectName?: string; // API 필드명 (기획/디자인 subject 아님)
  monthlyFee: number;
  paymentDay?: number; // 1~31
  guardianName?: string;
  guardianContact?: string;
  contact?: string;
  memo?: string;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

// POST /students, PUT /students/:id 동일 스키마 (불변 필드 제외)
export interface CreateStudentInput {
  name: string;
  birthDate?: string;
  subjectName?: string;
  monthlyFee: number;
  paymentDay?: number;
  guardianName?: string;
  guardianContact?: string;
  contact?: string;
  memo?: string;
}

// PUT은 전체 교체(R17) — 옵션 필드를 빼고 보내면 서버에서 해당 필드가 제거된다.
export type UpdateStudentInput = CreateStudentInput;
