export interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

// 모달 로컬 폼 필드 (기존 ChangePasswordForm 관례 + currentPassword)
export interface ChangePasswordModalForm {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}
