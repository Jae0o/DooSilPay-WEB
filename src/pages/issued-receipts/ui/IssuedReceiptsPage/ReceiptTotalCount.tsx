import { useIssuedReceiptsQuery } from '@entities/issued-receipt';

// PageHead 부제 "발급 N건" — 전체 발급 총계(RW-2). 자체 AsyncBoundary 안에서 소비.
const ReceiptTotalCount = () => {
  const { data } = useIssuedReceiptsQuery();

  return <>발급 {data.total}건</>;
};

export default ReceiptTotalCount;
