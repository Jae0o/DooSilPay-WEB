export interface ChangePasswordForm {
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordWithReauthInput {
  currentPassword: string;
  newPassword: string;
}
