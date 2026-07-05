import { useNavigate, useParams } from 'react-router';

import { getApiErrorCode } from '@shared/api';
import { AsyncBoundary, Button, ErrorFallback } from '@shared/ui';

import { StudentDetailSkeleton } from '../StudentDetailSkeleton';

import StudentDetailContent from './StudentDetailContent';

const StudentDetailPage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const goList = () => navigate('/students');

  return (
    <AsyncBoundary
      skeleton={<StudentDetailSkeleton />}
      errorSize="lg"
      resetKeys={[id]}
      errorFallback={({ error, reset }) =>
        getApiErrorCode(error) === 'STUDENT_NOT_FOUND' ? (
          <ErrorFallback
            size="lg"
            title="수강생을 찾을 수 없어요"
            description="삭제되었거나 잘못된 주소일 수 있어요."
            action={
              <Button variant="secondary" size="sm" onClick={goList}>
                목록으로
              </Button>
            }
          />
        ) : (
          <ErrorFallback size="lg" onRetry={reset} />
        )
      }
    >
      <StudentDetailContent id={id} />
    </AsyncBoundary>
  );
};

export default StudentDetailPage;
