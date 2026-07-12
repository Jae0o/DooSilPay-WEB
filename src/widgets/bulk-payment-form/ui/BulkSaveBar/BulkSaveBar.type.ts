export interface BulkSaveBarProps {
  validCount: number;
  grandTotal: number;
  isPending: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
