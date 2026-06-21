import { type User, onAuthStateChanged } from 'firebase/auth';
import { type ReactNode, useEffect, useState } from 'react';

import { auth } from '@shared/api';

import { AuthContext } from './AuthProvider.context';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(function subscribeAuthState() {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
