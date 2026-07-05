import { FormField } from '../FormField';
import { TextInput } from '../TextInput';

import type { TextFieldProps } from './TextField.type';

// FormField + TextInput 결합 — error 하나로 invalid까지 배선, 나머지 props(RHF register spread 포함)는 input으로 관통
const TextField = ({ label, required, hint, error, ...inputProps }: TextFieldProps) => (
  <FormField label={label} required={required} hint={hint} error={error}>
    <TextInput invalid={!!error} {...inputProps} />
  </FormField>
);

export default TextField;
