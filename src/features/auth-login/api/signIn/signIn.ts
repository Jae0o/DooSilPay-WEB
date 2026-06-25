import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@shared/api';

import type { LoginCredentials } from '../../model';

export const signIn = async ({ email, password, remember }: LoginCredentials) => {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  await signInWithEmailAndPassword(auth, email, password);
};
