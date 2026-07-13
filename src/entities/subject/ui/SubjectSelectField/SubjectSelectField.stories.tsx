import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SUBJECT_KEY } from '../../api';

import SubjectSelectField from './SubjectSelectField';

interface HarnessProps {
  subjects: string[];
  current?: string;
  required?: boolean;
  emptyHint?: string;
}

// 과목 캐시를 시드한 QueryClient + RHF 컨텍스트를 공급하는 스토리 전용 래퍼.
const Harness = ({ subjects, current, required, emptyHint }: HarnessProps) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient();
    client.setQueryData(SUBJECT_KEY.list(), subjects);

    return client;
  });
  const { register } = useForm<{ subjectName: string }>({ defaultValues: { subjectName: current ?? '' } });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-[32rem] max-w-full">
        <SubjectSelectField
          label="교습과목"
          required={required}
          placeholder="과목을 선택하세요"
          emptyHint={emptyHint}
          current={current}
          registration={register('subjectName')}
        />
      </div>
    </QueryClientProvider>
  );
};

/**
 * ## SubjectSelectField
 *
 * 등록된 교습과목을 Select로 고르는 **폼 필드**(`entities/subject/ui`). 학생·결제·벌크 폼이 공유한다.
 * 내부에서 필드 단위 `AsyncBoundary`로 `useSubjectsQuery`(suspense)를 감싸 폼·footer는 항상 마운트되고
 * 과목 필드만 스켈레톤으로 스왑된다(§8 V2-1). RHF와는 `registration`·`error` props로 연결한다.
 *
 * - **목록에 없는 기존 값**은 `current`로 넘기면 옵션 선두에 보존된다(edit·prefill 유실 방지, SJ2).
 * - **옵션 0건**이면 `emptyHint`로 설정 유도 문구를 노출한다(결제·벌크).
 */
const meta = {
  title: 'entities/subject/SubjectSelectField',
  component: Harness,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    subjects: { control: { disable: true }, description: '등록된 과목 목록(캐시 시드).' },
    current: { control: 'text', description: '폼의 기존 값 — 목록에 없으면 옵션 선두에 보존.' },
    required: { control: 'boolean', description: '필수 여부(라벨 * 표시).' },
    emptyHint: { control: 'text', description: '옵션 0건일 때만 노출되는 안내.' },
  },
} satisfies Meta<typeof Harness>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 등록된 과목이 옵션으로 나열된다. */
export const WithOptions: Story = {
  args: { subjects: ['피아노', '바이올린', '드럼'] },
};

/** 목록에 없는 기존 값(`current`)이 선두에 보존되어 선택 표시된다. */
export const PreservedValue: Story = {
  args: { subjects: ['피아노', '바이올린'], current: '레거시 과목' },
};

/** 과목 0건 — placeholder + 설정 유도 문구(`emptyHint`). 저장 차단은 폼의 required 검증에 위임. */
export const Empty: Story = {
  args: { subjects: [], required: true, emptyHint: '설정 > 교습과목에서 먼저 등록해 주세요.' },
};
