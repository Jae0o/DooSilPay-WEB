import { signOut } from 'firebase/auth';

import { ChangePasswordModal } from '@features/change-password';
import { auth } from '@shared/api';
import { useToggle } from '@shared/hooks';
import { Avatar, Button, Card, LockIcon, LogoutIcon, UsersIcon } from '@shared/ui';

import { SettingsSectionTitle } from '../SettingsSectionTitle';

import type { AccountSectionProps } from './AccountSection.type';

const AccountSection = ({ ownerName }: AccountSectionProps) => {
  const [isPasswordModalOpen, togglePasswordModal] = useToggle();

  // 가드 통과 후 렌더 = currentUser 존재 (S3). null 방어만 — '—'
  const email = auth.currentUser?.email ?? '—';

  // V2-3: signOut → onAuthStateChanged가 user를 null로 → ProtectedRoute가 /login 리다이렉트 (navigate 불필요)
  const handleLogout = () => {
    void signOut(auth);
  };

  return (
    <Card pad="2.8rem" className="mb-[1.6rem]">
      <SettingsSectionTitle icon={<UsersIcon size="1.9rem" />} title="계정" desc="로그인 계정 정보예요." />
      <div className="mt-[1.6rem] flex flex-wrap items-center justify-between gap-[1.2rem]">
        <div className="flex items-center gap-[1.2rem]">
          <Avatar name={ownerName} size="4.4rem" />
          <div>
            <div className="text-[1.6rem] font-bold">{ownerName} 원장님</div>
            <div className="tnum text-[1.4rem] text-ink-3">{email}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-[0.8rem]">
          <Button variant="ghost" icon={<LockIcon size="1.8rem" />} onClick={togglePasswordModal}>
            비밀번호 변경
          </Button>
          <Button variant="ghost" icon={<LogoutIcon size="1.8rem" />} onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>

      <ChangePasswordModal open={isPasswordModalOpen} onClose={togglePasswordModal} />
    </Card>
  );
};

export default AccountSection;
