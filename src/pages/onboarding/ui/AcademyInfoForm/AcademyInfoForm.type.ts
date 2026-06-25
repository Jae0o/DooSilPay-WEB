import type { UpsertAcademyInput } from '@entities/academy';

export interface AcademyInfoFormProps {
  onBack: () => void;
  onSubmit: (input: UpsertAcademyInput) => void;
  isPending?: boolean;
}
