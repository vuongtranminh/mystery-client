// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { redirect } from 'next/navigation'
import { cache } from 'react'
import { cookies } from 'next/headers'
import userApi from '@/app/api/user.api';

export const initialProfile = cache(async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  // console.log("++++++++++++")
  // console.log(accessToken)
  let cookie;
  if (accessToken?.value) {
    cookie = `accessToken=${accessToken?.value}`
  }
  if (refreshToken?.value) {
    cookie = cookie + `; refreshToken=${refreshToken?.value};`
  }

  const getCurrentUser = async () => {
    try {
      const { response, err } = await userApi.me(null, {
        headers: {
          Cookie: cookie
        }
      });
      // console.log(response)
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }

  const profile = await getCurrentUser();
  // console.log("PROFILE+++++++++")
  // console.log(profile)

  return profile;
});
