import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { SUBJECT_KEY } from '@entities/subject';

import SubjectsSection from './SubjectsSection';

// 과목 캐시를 시드한 QueryClient를 공급하는 스토리 전용 래퍼(즉시 저장 카드 — suspense 해소).
const Harness = ({ subjects }: { subjects: string[] }) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient();
    client.setQueryData(SUBJECT_KEY.list(), subjects);

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-[72rem]">
        <SubjectsSection />
      </div>
    </QueryClientProvider>
  );
};

/**
 * ## SubjectsSection
 *
 * 설정 페이지의 **교습과목 카드**. 이름 입력 + 추가, 등록된 과목 칩(각 칩 삭제)을 **즉시 저장**한다
 * (추가/삭제 = 개별 API + 토스트, 저장/되돌리기 바와 무관 — SJ3). 카드 내부 지역 `AsyncBoundary`로
 * 로딩은 지역 스켈레톤, 실패는 지역 ErrorFallback으로 처리해 다른 카드에 영향을 주지 않는다(SJ10).
 *
 * > 실제 추가/삭제 뮤테이션은 시연 범위 밖(네트워크 미연결) — 목록 렌더·0건 안내만 확인한다.
 */
const meta = {
  title: 'pages/settings/SubjectsSection',
  component: Harness,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    subjects: { control: { disable: true }, description: '등록된 과목 목록(캐시 시드).' },
  },
} satisfies Meta<typeof Harness>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 여러 과목이 칩으로 나열된다. */
export const Default: Story = {
  args: { subjects: ['피아노', '바이올린', '드럼', '보컬'] },
};

/** 0건 — 칩 대신 간결 안내 문구가 노출된다. */
export const Empty: Story = {
  args: { subjects: [] },
};
