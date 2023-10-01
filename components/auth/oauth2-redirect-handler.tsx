'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react"

export default function OAuth2RedirectHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
 
  useEffect(() => {
    if (searchParams.has('token')) {
      const token = searchParams.get('token')
      router.push('/');
    } else if (searchParams.has('error')) {
      const error = searchParams.get('error');
      router.push('/sign-in' + '?' + createQueryString('error', error));
    } else {
      router.push('/sign-in');
    }
  }, [searchParams])
 
  return null
}