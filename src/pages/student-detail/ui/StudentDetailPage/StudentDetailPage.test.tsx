import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { AxiosError } from 'axios';
import { RouterProvider, createMemoryRouter } from 'react-router';

import type { Student } from '@entities/student';
import { httpClient } from '@shared/api';

import StudentDetailPage from './StudentDetailPage';

vi.mock('@shared/api', () => ({
  httpClient: { get: vi.fn() },
  getApiErrorCode: (e: { response?: { data?: { error?: { code?: string } } } }) => e?.response?.data?.error?.code,
}));

const mockGet = httpClient.get as unknown as ReturnType<typeof vi.fn>;

const student: Student = {
  id: 's1',
  registrationNo: 1,
  name: '김수강',
  monthlyFee: 280000,
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const renderPage = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createMemoryRouter([{ path: '/students/:id', element: <StudentDetailPage /> }], {
    initialEntries: ['/students/s1'],
  });

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
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('StudentDetailPage', () => {
  it('수강생 상세 정보를 렌더한다', async () => {
    mockGet.mockResolvedValue({ data: { ok: true, data: student } });

    renderPage();

    expect(await screen.findByRole('heading', { name: student.name })).toBeInTheDocument();
    expect(screen.getByText('수강중')).toBeInTheDocument();
  });

  it('수강생을 찾을 수 없으면 안내 문구를 노출한다', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const error = new AxiosError('Not Found');
    error.response = { data: { error: { code: 'STUDENT_NOT_FOUND' } } } as never;
    mockGet.mockRejectedValue(error);

    renderPage();

    expect(await screen.findByText('수강생을 찾을 수 없어요')).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
