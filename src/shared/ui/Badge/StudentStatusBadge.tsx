import Badge from './Badge';

const StudentStatusBadge = ({ status }: { status: 'active' | 'inactive' }) =>
  status === 'active' ? <Badge tone="point">수강중</Badge> : <Badge tone="muted">휴식중</Badge>;

export default StudentStatusBadge;
