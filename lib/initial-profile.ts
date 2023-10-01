// import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import client from "@/app/api/client";
import { useUser } from "@/hooks/use-user";
import { db } from "@/lib/db";
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { cookies } from 'next/headers'

export const initialProfile = cache(async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')
  // console.log("++++++++++++")
  // console.log(accessToken)

  const getCurrentUser = async () => {
    try {
      const data = await client.get("/user/me", {
        headers: {
          Cookie: `accessToken=${accessToken?.value}; refreshToken=${refreshToken?.value};`
        }
      });
      console.log(data)
      return data.data;
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
