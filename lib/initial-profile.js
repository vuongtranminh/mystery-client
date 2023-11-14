// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { cache } from 'react'
import userApi from '@/app/api/user.api';
import { fetchServerSide } from '@/app/api/fetch.api';
import { addCookie } from './cookie.utils';

export const initialProfile = cache(async () => {

  const getCurrentUser = async () => {
    const { response, err } = await fetchServerSide(userApi.me)

    return response?.data
  }

  const profile = await getCurrentUser();

  return profile;
});
