import type { AcademyProfile } from '@entities/academy';

export interface OnboardingCompleteProps {
  academy: Pick<AcademyProfile, 'name' | 'ownerName'>;
  onGoHome: () => void;
}
