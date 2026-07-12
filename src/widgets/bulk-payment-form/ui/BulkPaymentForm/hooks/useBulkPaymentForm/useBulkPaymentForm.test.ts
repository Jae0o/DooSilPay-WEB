import { resolveBulkOutcome } from './useBulkPaymentForm';

// 유효 행(요청 순서) 폼 인덱스 ↔ 서버 skipped(요청 인덱스) 역산 검증
describe('resolveBulkOutcome', () => {
  it('전 행 성공 — 유효 행 폼 인덱스를 내림차순 제거, 사유 없음', () => {
    const { reasons, removeIndices } = resolveBulkOutcome([{ index: 0 }, { index: 2 }, { index: 3 }], []);

    expect(reasons).toEqual([]);
    expect(removeIndices).toEqual([3, 2, 0]);
  });

  it('부분 실패 — skipped 요청 idx를 폼 idx로 역산, created만 제거', () => {
    // 유효 행: 요청0→폼0, 요청1→폼2, 요청2→폼3. 서버가 요청1을 실패 처리
    const { reasons, removeIndices } = resolveBulkOutcome(
      [{ index: 0 }, { index: 2 }, { index: 3 }],
      [{ index: 1, reason: 'DUPLICATE_PAYMENT' }],
    );

    expect(reasons).toEqual([{ index: 2, reason: 'DUPLICATE_PAYMENT' }]);
    expect(removeIndices).toEqual([3, 0]); // 폼2(요청1)는 실패 → 유지
  });

  it('빈 행이 섞여도 폼 인덱스가 어긋나지 않는다', () => {
    // 폼 [0 유효, 1 빈, 2 유효] → validEntries = 요청순 [{0},{2}]
    const { reasons, removeIndices } = resolveBulkOutcome(
      [{ index: 0 }, { index: 2 }],
      [{ index: 0, reason: 'STUDENT_INACTIVE' }],
    );

    expect(reasons).toEqual([{ index: 0, reason: 'STUDENT_INACTIVE' }]);
    expect(removeIndices).toEqual([2]);
  });

  it('전 행 skipped — 제거 대상 없음, 전부 사유', () => {
    const { reasons, removeIndices } = resolveBulkOutcome(
      [{ index: 1 }, { index: 4 }],
      [
        { index: 0, reason: 'DUPLICATE_PAYMENT' },
        { index: 1, reason: 'STUDENT_NOT_FOUND' },
      ],
    );

    expect(reasons).toEqual([
      { index: 1, reason: 'DUPLICATE_PAYMENT' },
      { index: 4, reason: 'STUDENT_NOT_FOUND' },
    ]);
    expect(removeIndices).toEqual([]);
  });
});
