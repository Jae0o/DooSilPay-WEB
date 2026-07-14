import { Navigate, createBrowserRouter } from 'react-router';

import { BulkPaymentPage } from '@pages/bulk-payment';
import { IssueReceiptPage } from '@pages/issue-receipt';
import { IssuedReceiptsPage } from '@pages/issued-receipts';
import { ReceiptsExportPage } from '@pages/issued-receipts-export';
import { LoginPage } from '@pages/login';
import { OnboardingPage } from '@pages/onboarding';
import { SettingsPage } from '@pages/settings';
import { SignaturesPage } from '@pages/settings-signatures';
import { StudentDetailPage } from '@pages/student-detail';
import { StudentsPage } from '@pages/students';
import { AppShell } from '@widgets/app-shell';

import { ProtectedRoute } from './guards';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Navigate to="/students" replace /> },
      { path: '/onboarding/academy', element: <OnboardingPage /> },
      {
        element: <AppShell />,
        children: [
          { path: '/students', element: <StudentsPage /> },
          { path: '/students/new', element: <StudentsPage /> },
          { path: '/students/:id', element: <StudentDetailPage /> },
          { path: '/payments/bulk', element: <BulkPaymentPage /> },
          { path: '/issued-receipts', element: <IssuedReceiptsPage /> },
          { path: '/issued-receipts/export', element: <ReceiptsExportPage /> },
          { path: '/payments/:paymentId/issue', element: <IssueReceiptPage /> },
          { path: '/settings/academy', element: <SettingsPage /> },
          { path: '/settings/signatures', element: <SignaturesPage /> },
        ],
      },
    ],
  },
]);

export default router;
