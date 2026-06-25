export interface PasswordSetupFormProps {
  onSubmit: (password: string) => void;
  isPending?: boolean;
  errorMessage?: string | null;
}
