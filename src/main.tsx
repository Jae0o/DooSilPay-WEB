import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { AuthProvider, QueryProvider } from '@app/providers';
import { router } from '@app/routing';
import { ToastContainer } from '@shared/ui';

import './app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
