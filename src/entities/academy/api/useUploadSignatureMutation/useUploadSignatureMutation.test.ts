import axios from 'axios';

import { httpClient } from '@shared/api';

import type { AcademyProfile } from '../../model';

import { uploadSignature } from './useUploadSignatureMutation';

vi.mock('axios', () => ({
  default: { put: vi.fn() },
}));

vi.mock('@shared/api', () => ({
  httpClient: { post: vi.fn() },
}));

const mockPut = axios.put as unknown as ReturnType<typeof vi.fn>;
const mockPost = httpClient.post as unknown as ReturnType<typeof vi.fn>;

const academy: AcademyProfile = {
  ownerId: 'owner-1',
  name: '두페이 학원',
  ownerName: '김원장',
  signatureUrl: 'https://storage/owners/owner-1/signature?alt=media',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('uploadSignature', () => {
  beforeEach(() => {
    mockPut.mockReset();
    mockPost.mockReset();
  });

  it('sign-upload → Storage PUT → confirm 순서로 호출하고 confirm 결과를 반환한다', async () => {
    const file = new File(['png-bytes'], 'sign.png', { type: 'image/png' });
    const order: string[] = [];

    mockPost.mockImplementation((url: string) => {
      order.push(url);
      if (url === '/academy/signature/sign-upload') {
        return Promise.resolve({ data: { ok: true, data: { uploadUrl: 'https://upload', expiresAt: 'iso' } } });
      }

      return Promise.resolve({ data: { ok: true, data: academy } });
    });
    mockPut.mockImplementation(() => {
      order.push('PUT');

      return Promise.resolve({});
    });

    await expect(uploadSignature(file)).resolves.toEqual(academy);
    expect(order).toEqual(['/academy/signature/sign-upload', 'PUT', '/academy/signature/confirm']);
  });

  it('sign-upload 응답의 uploadUrl로 file.type Content-Type을 담아 PUT 한다', async () => {
    const file = new File(['jpg-bytes'], 'sign.jpg', { type: 'image/jpeg' });

    mockPost.mockResolvedValueOnce({
      data: { ok: true, data: { uploadUrl: 'https://upload-url', expiresAt: 'iso' } },
    });
    mockPost.mockResolvedValueOnce({ data: { ok: true, data: academy } });
    mockPut.mockResolvedValue({});

    await uploadSignature(file);

    expect(mockPost).toHaveBeenNthCalledWith(1, '/academy/signature/sign-upload', {
      fileName: 'sign.jpg',
      fileType: 'image/jpeg',
      fileSize: file.size,
    });
    expect(mockPut).toHaveBeenCalledWith('https://upload-url', file, {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  });
});
