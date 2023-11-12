// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { redirect } from 'next/navigation'
import { cache } from 'react'
import { cookies } from 'next/headers'
import userApi from '@/app/api/user.api';
import { fetchServerSide } from '@/app/api/fetch.api';

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
    // const { response, err } = await userApi.me(null, {
    //   headers: {
    //     Cookie: cookie
    //   }
    // });
    // // console.log(response)
    // return response?.data;
    const { response, err } = await fetchServerSide(userApi.me, null, {
      headers: {
        "Cookie": cookie
      }
    })

    return response?.data
  }

  const profile = await getCurrentUser();
  // console.log("PROFILE+++++++++")
  // console.log(profile)

  return profile;
});
