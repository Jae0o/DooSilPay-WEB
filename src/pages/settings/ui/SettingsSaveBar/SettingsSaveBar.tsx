import { motion } from 'motion/react';

import { Button, Card, CheckIcon } from '@shared/ui';

import type { SettingsSaveBarProps } from './SettingsSaveBar.type';

const SettingsSaveBar = ({ isPending, onRevert, onSave }: SettingsSaveBarProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: 'easeOut' }} // 디자인 dpFadeUp .2s
    className="sticky bottom-[9.4rem] md:bottom-[1.6rem]" // V2-4: 모바일 하단 nav(main pb-[7.8rem]) 위로 보정
  >
    <Card pad="1.4rem" className="flex items-center justify-between gap-[1.2rem] shadow-lg">
      <span className="text-[1.5rem] font-semibold text-ink-2">저장하지 않은 변경사항이 있어요</span>
      <div className="flex shrink-0 gap-[0.8rem]">
        <Button variant="ghost" onClick={onRevert}>
          되돌리기
        </Button>
        <Button icon={<CheckIcon size="1.8rem" />} onClick={onSave} isLoading={isPending}>
          저장
        </Button>
      </div>
    </Card>
  </motion.div>
);

export default SettingsSaveBar;
