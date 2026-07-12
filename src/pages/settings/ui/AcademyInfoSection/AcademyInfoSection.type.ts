import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { UpsertAcademyInput } from '@entities/academy';

export interface AcademyInfoSectionProps {
  register: UseFormRegister<UpsertAcademyInput>;
  errors: FieldErrors<UpsertAcademyInput>;
}
