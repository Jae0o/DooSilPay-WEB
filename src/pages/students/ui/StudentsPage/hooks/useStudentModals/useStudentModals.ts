import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router';

import type { Student } from '@entities/student';

const useStudentModals = () => {
  const navigate = useNavigate();
  const isNew = useMatch('/students/new');

  const [formModal, setFormModal] = useState<{ open: boolean; mode: 'create' | 'edit'; student?: Student }>({
    open: false,
    mode: 'create',
  });
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const closeForm = () => {
    setFormModal((m) => ({ ...m, open: false }));
    if (isNew) navigate('/students', { replace: true }); // 주소 정리 — 재방문 시 모달 재오픈 방지
  };

  return {
    // /students/new 진입 시 등록 모달 자동 오픈 (R16) — effect 대신 라우트에서 파생 (set-state-in-effect 회피)
    form: {
      open: formModal.open || !!isNew,
      mode: isNew ? ('create' as const) : formModal.mode,
      student: isNew ? undefined : formModal.student,
    },
    deleteTarget,
    deleteOpen,
    openCreate: () => setFormModal({ open: true, mode: 'create' }),
    openEdit: (student: Student) => setFormModal({ open: true, mode: 'edit', student }),
    openDelete: (student: Student) => {
      setDeleteTarget(student);
      setDeleteOpen(true);
    },
    closeForm,
    closeDelete: () => setDeleteOpen(false),
  };
};

export default useStudentModals;
