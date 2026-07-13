import buildSubjectOptions from './buildSubjectOptions';

describe('buildSubjectOptions', () => {
  it('목록만 주어지면 각 과목을 value=label 옵션으로 변환한다', () => {
    expect(buildSubjectOptions(['피아노', '바이올린'])).toEqual([
      { value: '피아노', label: '피아노' },
      { value: '바이올린', label: '바이올린' },
    ]);
  });

  it('current가 목록에 없으면 선두에 병합한다', () => {
    expect(buildSubjectOptions(['피아노'], '드럼')).toEqual([
      { value: '드럼', label: '드럼' },
      { value: '피아노', label: '피아노' },
    ]);
  });

  it('current가 목록에 있으면 중복 병합하지 않는다', () => {
    expect(buildSubjectOptions(['피아노', '드럼'], '드럼')).toEqual([
      { value: '피아노', label: '피아노' },
      { value: '드럼', label: '드럼' },
    ]);
  });

  it('빈 목록이어도 current는 옵션으로 보존한다', () => {
    expect(buildSubjectOptions([], '드럼')).toEqual([{ value: '드럼', label: '드럼' }]);
  });

  it('current가 없으면(undefined·빈 문자열) 목록만 반환한다', () => {
    expect(buildSubjectOptions(['피아노'])).toEqual([{ value: '피아노', label: '피아노' }]);
    expect(buildSubjectOptions(['피아노'], '')).toEqual([{ value: '피아노', label: '피아노' }]);
  });
});
