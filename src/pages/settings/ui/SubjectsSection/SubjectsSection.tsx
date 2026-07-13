import { AsyncBoundary, Badge, Button, Card, CloseIcon, LayersIcon, PlusIcon, TextField } from '@shared/ui';

import { SettingsSectionTitle } from '../SettingsSectionTitle';

import { SubjectsSectionSkeleton } from './SubjectsSectionSkeleton';
import { useSubjectsCard } from './hooks';

const SubjectsCardBody = () => {
  const { subjects, register, errors, submitAdd, isAdding, remove } = useSubjectsCard();

  return (
    <div>
      <form onSubmit={submitAdd} className="grid grid-cols-1 gap-[1rem] md:grid-cols-[1fr_auto]">
        <TextField
          placeholder="예) 피아노"
          error={errors.name?.message}
          {...register('name', { maxLength: { value: 30, message: '30자 이내로 입력해 주세요.' } })}
        />
        <Button type="submit" icon={<PlusIcon size="1.8rem" />} isLoading={isAdding}>
          추가
        </Button>
      </form>

      {subjects.length === 0 ? (
        <p className="mt-[1.6rem] text-[1.4rem] text-ink-3">등록된 과목이 없어요. 위에서 첫 과목을 추가해 보세요.</p>
      ) : (
        <div className="mt-[1.6rem] flex flex-wrap gap-[0.8rem]">
          {subjects.map((name) => (
            <Badge key={name} tone="point">
              {name}
              <button
                type="button"
                aria-label={`${name} 삭제`}
                onClick={() => remove(name)}
                className="-mr-[0.4rem] grid place-items-center rounded-pill p-[0.2rem] text-point-strong transition-colors hover:text-danger"
              >
                <CloseIcon size="1.2rem" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

const SubjectsSection = () => (
  <Card pad="2.8rem" className="mb-[1.6rem]">
    <SettingsSectionTitle
      icon={<LayersIcon size="1.9rem" />}
      title="교습과목"
      desc="수강생·수납 등록에서 선택할 과목 목록이에요."
    />
    <div className="mt-[1.8rem]">
      <AsyncBoundary skeleton={<SubjectsSectionSkeleton />} errorSize="sm">
        <SubjectsCardBody />
      </AsyncBoundary>
    </div>
  </Card>
);

export default SubjectsSection;
