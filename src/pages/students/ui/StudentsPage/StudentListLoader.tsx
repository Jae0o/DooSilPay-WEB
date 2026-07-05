import { useNavigate } from 'react-router';

import { type ListStudentsParams, type Student, useStudentsQuery } from '@entities/student';

import { StudentList } from '../StudentList';

interface StudentListLoaderProps {
  params: ListStudentsParams;
  onLoadMore: () => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

// 경계 내부 데이터 컴포넌트 — suspend/에러는 AsyncBoundary가 수신 (R18). limit 100 도달 시 더 보기 숨김 (R13)
const StudentListLoader = ({ params, onLoadMore, onEdit, onDelete }: StudentListLoaderProps) => {
  const { data } = useStudentsQuery(params);
  const navigate = useNavigate();

  return (
    <StudentList
      students={data.items}
      hasNext={data.hasNext && (params.limit ?? 20) < 100}
      onLoadMore={onLoadMore}
      onRowClick={(id) => navigate(`/students/${id}`)}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default StudentListLoader;
