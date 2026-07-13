export interface BulkSaveBarProps {
  validCount: number;
  grandTotal: number;
  alsoIssue: boolean; // RW-9 — 저장과 동시에 교부영수증 일괄 발급
  onAlsoIssueChange: (next: boolean) => void;
  isPending: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
