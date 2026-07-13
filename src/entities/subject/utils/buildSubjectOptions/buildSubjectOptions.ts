import type { SelectOption } from '@shared/ui';

/**
 * 등록된 과목 목록을 Select 옵션으로 변환한다.
 * `current`(폼의 기존 값)가 목록에 없으면 유실 방지를 위해 선두에 병합한다(SJ2).
 */
const buildSubjectOptions = (subjects: string[], current?: string): SelectOption[] => {
  const options = subjects.map((name) => ({ value: name, label: name }));

  if (current && !subjects.includes(current)) {
    return [{ value: current, label: current }, ...options];
  }

  return options;
};

export default buildSubjectOptions;
