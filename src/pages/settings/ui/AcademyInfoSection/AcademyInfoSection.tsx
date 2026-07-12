import { BuildingIcon, Card, TextField } from '@shared/ui';

import { SettingsSectionTitle } from '../SettingsSectionTitle';

import type { AcademyInfoSectionProps } from './AcademyInfoSection.type';

const AcademyInfoSection = ({ register, errors }: AcademyInfoSectionProps) => (
  <Card pad="2.8rem" className="mb-[1.6rem]">
    <SettingsSectionTitle
      icon={<BuildingIcon size="1.9rem" />}
      title="학원 정보"
      desc="교부 영수증의 발급 주체로 표시돼요."
    />
    <div className="mt-[1.8rem] flex flex-col gap-[1.6rem]">
      <div className="grid grid-cols-1 gap-[1.4rem] md:grid-cols-2">
        <TextField
          label="학원명 / 상호"
          required
          error={errors.name?.message}
          {...register('name', {
            required: '학원명을 입력해 주세요.',
            maxLength: { value: 50, message: '학원명은 50자 이하로 입력해 주세요.' },
          })}
        />
        <TextField
          label="대표자 / 교습자명"
          required
          error={errors.ownerName?.message}
          {...register('ownerName', {
            required: '대표자명을 입력해 주세요.',
            maxLength: { value: 30, message: '대표자명은 30자 이하로 입력해 주세요.' },
          })}
        />
      </div>
      <div className="grid grid-cols-1 gap-[1.4rem] md:grid-cols-2">
        <TextField label="사업자등록번호" placeholder="000-00-00000" {...register('bizNo')} />
        <TextField label="대표 전화" placeholder="02-000-0000" {...register('tel')} />
      </div>
      <TextField label="학원 주소" {...register('address')} />
    </div>
  </Card>
);

export default AcademyInfoSection;
