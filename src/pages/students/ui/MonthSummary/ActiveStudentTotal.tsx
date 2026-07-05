import { useStudentsQuery } from '@entities/student';

// 활성 원생 총 수 — 02-01 ActiveStudentCount와 동일 쿼리키({ status: 'active', limit: 1 }) → 캐시 공유 (중복 요청 없음)
const ActiveStudentTotal = () => {
  const { data } = useStudentsQuery({ status: 'active', limit: 1 });

  return <>/ 활성 원생 {data.total}명</>;
};

export default ActiveStudentTotal;
