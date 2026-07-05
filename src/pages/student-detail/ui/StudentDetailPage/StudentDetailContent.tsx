import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useStudentQuery } from '@entities/student';
import { DeleteStudentDialog } from '@features/delete-student';
import { StudentDetail } from '@widgets/student-detail';
import { StudentFormModal } from '@widgets/student-form-modal';

// 경계 내부 데이터 컴포넌트 — suspend/에러는 AsyncBoundary가 수신 (R18)
const StudentDetailContent = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const { data: student } = useStudentQuery(id); // suspense — student 항상 존재

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <StudentDetail student={student} onEdit={() => setEditOpen(true)} onDelete={() => setDeleteOpen(true)} />

      <StudentFormModal open={editOpen} mode="edit" student={student} onClose={() => setEditOpen(false)} />
      <DeleteStudentDialog
        open={deleteOpen}
        student={student}
        onClose={() => setDeleteOpen(false)} // 취소 → 상세 유지
        onDeleted={() => navigate('/students')} // 삭제 성공 → 목록 이동
      />
    </>
  );
};

export default StudentDetailContent;
