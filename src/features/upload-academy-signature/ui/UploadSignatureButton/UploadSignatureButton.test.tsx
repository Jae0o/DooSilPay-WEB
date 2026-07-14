import { fireEvent, render } from '@testing-library/react';

import UploadSignatureButton from './UploadSignatureButton';

const mutateSpy = vi.hoisted(() => vi.fn());
const showSpy = vi.hoisted(() => vi.fn());

vi.mock('@entities/academy', () => ({
  useUploadSignatureMutation: () => ({ mutate: mutateSpy, isPending: false }),
}));

vi.mock('@shared/hooks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@shared/hooks')>()),
  useToast: () => showSpy,
}));

const getFileInput = (container: HTMLElement) => container.querySelector('input[type="file"]') as HTMLInputElement;

afterEach(() => {
  mutateSpy.mockClear();
  showSpy.mockClear();
});

describe('UploadSignatureButton', () => {
  it('png/jpg가 아니면 뮤테이션 없이 warning 토스트로 차단한다', () => {
    const { container } = render(<UploadSignatureButton hasSignature={false} />);
    const file = new File(['x'], 'sign.webp', { type: 'image/webp' });

    fireEvent.change(getFileInput(container), { target: { files: [file] } });

    expect(mutateSpy).not.toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalledWith(expect.objectContaining({ variant: 'warning' }));
  });

  it('2MB를 초과하면 뮤테이션 없이 warning 토스트로 차단한다', () => {
    const { container } = render(<UploadSignatureButton hasSignature={false} />);
    const file = new File([new Uint8Array(2 * 1024 * 1024 + 1)], 'big.png', { type: 'image/png' });

    fireEvent.change(getFileInput(container), { target: { files: [file] } });

    expect(mutateSpy).not.toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalledWith(expect.objectContaining({ variant: 'warning' }));
  });

  it('유효한 파일이면 해당 파일로 업로드 뮤테이션을 호출한다', () => {
    const { container } = render(<UploadSignatureButton hasSignature={false} />);
    const file = new File(['png-bytes'], 'sign.png', { type: 'image/png' });

    fireEvent.change(getFileInput(container), { target: { files: [file] } });

    expect(showSpy).not.toHaveBeenCalled();
    expect(mutateSpy).toHaveBeenCalledTimes(1);
    expect(mutateSpy.mock.calls[0][0]).toBe(file);
  });
});
