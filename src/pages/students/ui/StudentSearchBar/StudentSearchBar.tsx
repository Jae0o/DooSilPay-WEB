import type { ListStudentsParams } from '@entities/student';
import { SearchIcon, Select, TextInput } from '@shared/ui';

import type { StudentSearchBarProps } from './StudentSearchBar.type';
import { useDebouncedKeyword } from './hooks';

const STATUS_OPTIONS = [
  { value: 'active', label: '수강중' },
  { value: 'inactive', label: '휴식중' },
  { value: 'all', label: '전체' },
];

const SORT_OPTIONS = [
  { value: 'registrationNo', label: '등록번호순' },
  { value: 'name', label: '이름순' },
];

const StudentSearchBar = ({ params, onChange }: StudentSearchBarProps) => {
  const [keyword, setKeyword] = useDebouncedKeyword({ q: params.q, onChange });

  return (
    <div className="mb-[1.8rem] flex flex-wrap gap-[1.2rem]">
      <TextInput
        className="max-w-[34rem] flex-1 basis-[24rem]"
        placeholder="이름 · 과목 검색"
        prefix={<SearchIcon size="1.8rem" />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Select
        className="w-[13rem]"
        options={STATUS_OPTIONS}
        value={params.status ?? 'active'}
        onChange={(e) => onChange({ status: e.target.value as ListStudentsParams['status'], page: 1 })}
      />

      <Select
        className="w-[13rem]"
        options={SORT_OPTIONS}
        value={params.sort ?? 'registrationNo'}
        onChange={(e) => onChange({ sort: e.target.value as ListStudentsParams['sort'] })}
      />
    </div>
  );
};

export default StudentSearchBar;
