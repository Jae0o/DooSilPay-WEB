import { AsyncBoundary, FormField, Select, Skeleton } from '@shared/ui';

import { useSubjectsQuery } from '../../api';
import { buildSubjectOptions } from '../../utils';

import type { SubjectSelectControlProps, SubjectSelectFieldProps } from './SubjectSelectField.type';

const SubjectSelectControl = ({
  registration,
  current,
  placeholder,
  invalid,
  emptyHint,
}: SubjectSelectControlProps) => {
  const { data: subjects } = useSubjectsQuery();
  const options = buildSubjectOptions(subjects, current);

  return (
    <>
      <Select options={options} placeholder={placeholder} invalid={invalid} {...registration} />
      {emptyHint && options.length === 0 && <p className="mt-[0.6rem] text-[1.3rem] text-ink-3">{emptyHint}</p>}
    </>
  );
};

const SubjectSelectField = ({
  registration,
  label,
  required = false,
  error,
  current,
  placeholder,
  emptyHint,
  className,
}: SubjectSelectFieldProps) => (
  <FormField label={label} required={required} error={error} className={className}>
    <AsyncBoundary skeleton={<Skeleton className="h-[5rem] w-full rounded-md" />} errorSize="sm">
      <SubjectSelectControl
        registration={registration}
        current={current}
        placeholder={placeholder}
        invalid={!!error}
        emptyHint={emptyHint}
      />
    </AsyncBoundary>
  </FormField>
);

export default SubjectSelectField;
