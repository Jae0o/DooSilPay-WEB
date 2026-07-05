import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';

import { httpClient } from '@shared/api';

import StudentsPage from './StudentsPage';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
  getApiErrorCode: (e: { response?: { data?: { error?: { code?: string } } } }) => e?.response?.data?.error?.code,
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const students = [
  {
    id: 'student-1',
    registrationNo: 1,
    name: '김수강',
    monthlyFee: 280000,
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'student-2',
    registrationNo: 2,
    name: '이학생',
    monthlyFee: 150000,
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

const listEnvelope = (items: typeof students) => ({
  data: { ok: true, data: { items, total: items.length, page: 1, limit: 20, hasNext: false } },
});

const renderPage = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter(
    [
      { path: '/students', element: <StudentsPage /> },
      { path: '/students/:id', element: <div>detail-probe</div> },
    ],
    { initialEntries: ['/students'] },
  );

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
  mockGet.mockReset();
  mockGet.mockImplementation((url: string) => {
    if (url === '/students') return Promise.resolve(listEnvelope(students));
    return Promise.resolve(listEnvelope(students));
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('StudentsPage', () => {
  it('수강생 목록을 렌더한다', async () => {
    renderPage();

    expect(await screen.findByText('김수강')).toBeInTheDocument();
    expect(screen.getByText('이학생')).toBeInTheDocument();
  });

  it('목록이 비어 있으면 빈 상태 문구를 노출한다', async () => {
    mockGet.mockImplementation(() => Promise.resolve(listEnvelope([])));
    renderPage();

    expect(await screen.findByText('수강생이 없어요')).toBeInTheDocument();
  });

  it('검색어를 입력하면 디바운스 후 q 파라미터로 재조회한다', async () => {
    const user = userEvent.setup();
    renderPage();

    await screen.findByText('김수강');
    mockGet.mockClear();

    await user.type(screen.getByPlaceholderText('이름 · 과목 검색'), '김');

    await waitFor(
      () => {
        const called = mockGet.mock.calls.some(([, options]) => options?.params?.q === '김');
        expect(called).toBe(true);
      },
      { timeout: 1000 },
    );
  });

  it('행을 클릭하면 상세 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    renderPage();

    await screen.findByText('김수강');

    await user.click(screen.getByText('김수강'));

    expect(await screen.findByText('detail-probe')).toBeInTheDocument();
  });
});
