import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { IssuedReceipt } from '@entities/issued-receipt';
import { useNarrow } from '@shared/hooks';

import ReceiptList from './ReceiptList';

// useNarrow(ResizeObserver 기반)를 모킹해 테이블/카드 두 분기를 결정적으로 강제한다.
vi.mock('@shared/hooks', () => ({ useNarrow: vi.fn() }));

const mockUseNarrow = useNarrow as unknown as ReturnType<typeof vi.fn>;
const setNarrow = (narrow: boolean) => mockUseNarrow.mockReturnValue([{ current: null }, narrow, 0]);

const buildReceipt = (overrides: Partial<IssuedReceipt> & { id: string }): IssuedReceipt => ({
  issueYearMonth: '2026-06',
  seq: 1,
  paymentId: `payment-${overrides.id}`,
  studentSnapshot: { registrationNo: 1, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
  ...overrides,
});

const ROWS: IssuedReceipt[] = [
  buildReceipt({
    id: 'r1',
    seq: 5,
    studentSnapshot: { registrationNo: 5, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  }),
  buildReceipt({
    id: 'r2',
    seq: 4,
    studentSnapshot: { registrationNo: 4, name: '김민준', birthDate: '2011-07-14', subjectName: '초등 영어' },
    tuitionFee: 200000,
  }),
];

describe('ReceiptList', () => {
  describe('테이블 분기 (narrow=false)', () => {
    beforeEach(() => setNarrow(false));

    it('행을 렌더한다 (학생명·일련번호·금액)', () => {
      render(<ReceiptList rows={ROWS} onPreview={vi.fn()} onDelete={vi.fn()} />);

      expect(screen.getByText('홍길동')).toBeInTheDocument();
      expect(screen.getByText('김민준')).toBeInTheDocument();
      expect(screen.getByText('2026-06-005')).toBeInTheDocument();
      expect(screen.getByText('280,000원')).toBeInTheDocument();
    });

    it('미리보기 버튼을 클릭하면 onPreview(receipt)를 호출한다', async () => {
      const user = userEvent.setup();
      const onPreview = vi.fn();
      render(<ReceiptList rows={ROWS} onPreview={onPreview} onDelete={vi.fn()} />);

      await user.click(screen.getAllByRole('button', { name: '미리보기' })[0]);

      expect(onPreview).toHaveBeenCalledWith(ROWS[0]);
    });

    it('삭제 버튼을 클릭하면 onDelete(receipt)를 호출한다', async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn();
      render(<ReceiptList rows={ROWS} onPreview={vi.fn()} onDelete={onDelete} />);

      await user.click(screen.getAllByRole('button', { name: '삭제' })[0]);

      expect(onDelete).toHaveBeenCalledWith(ROWS[0]);
    });
  });

  describe('카드 분기 (narrow=true)', () => {
    beforeEach(() => setNarrow(true));

    it('카드를 클릭하면 onPreview(receipt)를 호출한다', async () => {
      const user = userEvent.setup();
      const onPreview = vi.fn();
      render(<ReceiptList rows={ROWS} onPreview={onPreview} onDelete={vi.fn()} />);

      await user.click(screen.getByText('홍길동'));

      expect(onPreview).toHaveBeenCalledWith(ROWS[0]);
    });

    it('카드의 삭제 버튼은 onDelete만 호출하고 onPreview로는 전파되지 않는다', async () => {
      const user = userEvent.setup();
      const onPreview = vi.fn();
      const onDelete = vi.fn();
      render(<ReceiptList rows={ROWS} onPreview={onPreview} onDelete={onDelete} />);

      await user.click(screen.getAllByRole('button', { name: '삭제' })[0]);

      expect(onDelete).toHaveBeenCalledWith(ROWS[0]);
      expect(onPreview).not.toHaveBeenCalled();
    });
  });
});
