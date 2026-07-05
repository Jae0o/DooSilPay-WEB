import { useStudentsQuery } from '@entities/student';

// 활성 수강생 총 수 — total만 취득 (limit:1로 최소 응답, 목록 필터와 무관한 전용 쿼리)
const ActiveStudentCount = () => {
  const { data } = useStudentsQuery({ status: 'active', limit: 1 });

  return <>활성 수강생 {data.total}명</>;
};

export default ActiveStudentCount;
