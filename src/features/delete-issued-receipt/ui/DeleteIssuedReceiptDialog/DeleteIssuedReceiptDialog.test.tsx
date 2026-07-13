import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { IssuedReceipt } from '@entities/issued-receipt';
import { httpClient } from '@shared/api';

import DeleteIssuedReceiptDialog from './DeleteIssuedReceiptDialog';

vi.mock('@shared/api', () => ({ httpClient: { delete: vi.fn() } }));

const mockDelete = httpClient.delete as unknown as ReturnType<typeof vi.fn>;

const SAMPLE_RECEIPT: IssuedReceipt = {
  id: 'receipt-1',
  issueYearMonth: '2026-06',
  seq: 3,
  paymentId: 'payment-1',
  studentSnapshot: { registrationNo: 7, name: '홍길동', birthDate: '2010-03-02', subjectName: '중등 수학' },
  period: '2026-06',
  tuitionFee: 280000,
  otherFees: [{ label: '교재비', amount: 30000 }],
  issuedDate: '2026-06-05',
  academy: { name: '두페이수학학원', ownerName: '김원장' },
  createdAt: '2026-06-05T00:00:00.000Z',
  updatedAt: '2026-06-05T00:00:00.000Z',
};

const renderDialog = (onClose = vi.fn()) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  render(
    <QueryClientProvider client={queryClient}>
      <DeleteIssuedReceiptDialog receipt={SAMPLE_RECEIPT} onClose={onClose} />
    </QueryClientProvider>,
  );

  return { onClose };
};

beforeEach(() => {
  // Modal → useBreakpoint가 matchMedia를 사용 — jsdom 미구현이라 스텁 필요.
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  mockDelete.mockReset();
  mockDelete.mockResolvedValue({ data: { ok: true, data: { id: SAMPLE_RECEIPT.id } } });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DeleteIssuedReceiptDialog', () => {
  it('RW-1 안내 문구(같은 달 일련번호 재정렬)를 렌더한다', () => {
    renderDialog();

    expect(screen.getByText(/같은 달 일련번호가 재정렬됩니다/)).toBeInTheDocument();
  });

  it('삭제를 누르면 삭제 요청을 보내고 onClose를 호출한다', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();

    await user.click(screen.getByRole('button', { name: '삭제' }));

    await waitFor(() => expect(mockDelete).toHaveBeenCalledWith('/issued-receipts/receipt-1'));
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it('취소를 누르면 삭제 요청 없이 onClose를 호출한다', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(mockDelete).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
