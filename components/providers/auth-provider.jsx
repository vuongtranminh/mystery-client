"use client";

import userApi from "@/app/api/user.api";
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

import { useContext, createContext } from 'react'

const AuthContext = createContext({
  user: false,
  // setUser: () => false
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const pathname = usePathname()

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (pathname !== "/sign-in" || pathname !== "/sign-up") {
      getCurrentUser();
    }
  }, []);

  const redirectToSignIn = () => {
    redirect("/sign-in")
  }

  const getCurrentUser = async () => {
    const { response, err } = await userApi.me();

    if (response?.success) {
      setUser(response?.data)
    } else {
      redirectToSignIn()
    }
  }

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  )
}