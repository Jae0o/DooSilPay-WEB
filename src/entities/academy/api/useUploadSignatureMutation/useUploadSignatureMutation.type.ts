export interface SignUploadSignatureInput {
  fileName: string;
  fileType: string; // 'image/png' | 'image/jpeg' — 서버 zod가 최종 검증
  fileSize: number;
}

export interface SignUploadSignatureResult {
  uploadUrl: string;
  expiresAt: string; // ISO
}
