import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { AcademyProfile } from '../../model';
import { ACADEMY_KEY } from '../academy.keys';

import type { SignUploadSignatureInput, SignUploadSignatureResult } from './useUploadSignatureMutation.type';

export const signUploadSignature = async (input: SignUploadSignatureInput): Promise<SignUploadSignatureResult> => {
  const res = await httpClient.post<APIResponse<SignUploadSignatureResult>>('/academy/signature/sign-upload', input);

  return res.data.data;
};

export const confirmSignature = async (): Promise<AcademyProfile> => {
  const res = await httpClient.post<APIResponse<AcademyProfile>>('/academy/signature/confirm');

  return res.data.data;
};

export const uploadSignature = async (file: File): Promise<AcademyProfile> => {
  const { uploadUrl } = await signUploadSignature({
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });

  await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type } });

  return confirmSignature();
};

const useUploadSignatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadSignature,
    onSuccess: (data) => {
      queryClient.setQueryData(ACADEMY_KEY.me(), data);
    },
  });
};

export default useUploadSignatureMutation;
