// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { redirect } from 'next/navigation'
import { cache } from 'react'
import { cookies } from 'next/headers'
import mystery from "@/app/api/mystery";

export const initialProfile = cache(async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  // console.log("++++++++++++")
  // console.log(accessToken)

  const getCurrentUser = async () => {
    try {
      const { response, err } = await userApi.me({}, {
        headers: {
          Cookie: `accessToken=${accessToken?.value}; refreshToken=${refreshToken?.value};`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in")
  }

  const profile = user

  return profile
});
