import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../Button';

import Modal from './Modal';
import type { ModalSize } from './Modal.type';

/**
 * ## Modal 컴포넌트
 *
 * DooPay 공통 모달. `createPortal`로 `document.body`에 렌더하고, 데스크탑에서는
 * 중앙 팝업, 모바일(<768px)에서는 하단 시트로 전환된다(`useBreakpoint`).
 * ESC 키·오버레이 클릭으로 닫히고, `size`로 최대 너비를 4단계 조절한다.
 *
 * ### 사용 방법
 *
 * ```tsx
 * import { Modal, Button } from '@shared/ui';
 *
 * const [open, setOpen] = useState(false);
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="수강생 등록"
 *   footer={<Button onClick={() => setOpen(false)}>확인</Button>}
 * >
 *   내용
 * </Modal>;
 * ```
 *
 * ### Props
 *
 * - **open**: 열림 여부(필수)
 * - **onClose**: 닫기 핸들러(필수) — ESC·오버레이 클릭·닫기 버튼에서 호출
 * - **title / subtitle**: 헤더 제목·부제
 * - **size**: `sm` | `md` | `lg` | `xl` (기본 `md`) — 데스크탑 최대 너비
 * - **footer**: 하단 액션 영역(ReactNode)
 * - **padded**: 본문 좌우·상하 패딩 여부(기본 `true`)
 *
 * > 모바일 하단 시트 형태는 Storybook 툴바의 뷰포트를 모바일로 바꿔 확인한다.
 */
const meta = {
  title: 'shared/ui/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { open: false, onClose: () => {} },
  argTypes: {
    open: { control: { disable: true }, description: '열림 여부(필수).' },
    onClose: { control: { disable: true }, description: '닫기 핸들러(필수).' },
    title: { control: 'text', description: '헤더 제목.' },
    subtitle: { control: 'text', description: '헤더 부제.' },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: '데스크탑 최대 너비.',
    },
    footer: { control: { disable: true }, description: '하단 액션 영역(ReactNode).' },
    padded: { control: 'boolean', description: '본문 패딩 여부(기본 true).' },
    children: { control: { disable: true }, description: '모달 본문.' },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="수강생 등록" subtitle="기본 정보를 입력해 주세요">
        <p className="text-[1.5rem] text-ink-2">모달 본문 콘텐츠.</p>
      </Modal>
    </>
  );
};

/** 열기 버튼으로 여닫는 기본 모달. */
export const Default: Story = { render: () => <DefaultDemo /> };

const WithFooterDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="수강생 삭제"
        footer={
          <>
            <Button variant="neutral" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              삭제
            </Button>
          </>
        }
      >
        <p className="text-[1.5rem] text-ink-2">정말 삭제할까요? 되돌릴 수 없어요.</p>
      </Modal>
    </>
  );
};

/** footer에 취소/삭제 버튼 2개. */
export const WithFooter: Story = { render: () => <WithFooterDemo /> };

const SIZES: ModalSize[] = ['sm', 'md', 'lg', 'xl'];

const SizesDemo = () => {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);

  return (
    <>
      <div className="flex gap-[1.2rem]">
        {SIZES.map((size) => (
          <Button key={size} variant="neutral" onClick={() => setOpenSize(size)}>
            {size}
          </Button>
        ))}
      </div>
      <Modal
        open={openSize !== null}
        onClose={() => setOpenSize(null)}
        title={`${openSize ?? 'md'} 사이즈`}
        size={openSize ?? 'md'}
      >
        <p className="text-[1.5rem] text-ink-2">데스크탑 최대 너비가 달라진다.</p>
      </Modal>
    </>
  );
};

/** sm/md/lg/xl 각 사이즈를 버튼으로 열어 데스크탑 최대 너비 차이를 비교. */
export const Sizes: Story = { render: () => <SizesDemo /> };

const LongContentDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="이용 약관"
        footer={<Button onClick={() => setOpen(false)}>동의</Button>}
      >
        <div className="flex flex-col gap-[1.2rem] text-[1.4rem] text-ink-2">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>{i + 1}. 약관 조항 내용이 이어집니다.</p>
          ))}
        </div>
      </Modal>
    </>
  );
};

/** 스크롤 확인용 긴 콘텐츠 — 본문 영역만 스크롤되고 헤더/푸터는 고정. */
export const LongContent: Story = { render: () => <LongContentDemo /> };
