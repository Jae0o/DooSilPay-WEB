import { Avatar, Card, UsersIcon } from '@shared/ui';

import { SettingsSectionTitle } from '../SettingsSectionTitle';

import type { AccountSectionProps } from './AccountSection.type';

const AccountSection = ({ ownerName }: AccountSectionProps) => (
  <Card pad="2.8rem" className="mb-[1.6rem]">
    <SettingsSectionTitle icon={<UsersIcon size="1.9rem" />} title="계정" desc="로그인 계정 정보예요." />
    <div className="mt-[1.6rem] flex flex-wrap items-center justify-between gap-[1.2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <Avatar name={ownerName} size="4.4rem" />
        <div>
          <div className="text-[1.6rem] font-bold">{ownerName} 원장님</div>
          <div className="tnum text-[1.4rem] text-ink-3">{/* 이메일 — 03-01에서 auth.currentUser.email 배선 */}</div>
        </div>
      </div>
      <div className="flex gap-[0.8rem]">
        {/* [비밀번호 변경](ghost, LockIcon) · [로그아웃](ghost, LogoutIcon) — onClick은 03에서 */}
      </div>
    </div>
  </Card>
);

export default AccountSection;
