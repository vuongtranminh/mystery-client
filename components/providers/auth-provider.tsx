"use client";

import client from "@/app/api/client";
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

import { useContext, createContext } from 'react'

const AuthContext = createContext({
  user: false,
  // setUser: () => false
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
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
    try {
      const data = await client.get("/user/me");
      
      if (data.success) {
        setUser(data.data)
      } else {
        redirectToSignIn()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{user: user}}>
      {children}
    </AuthContext.Provider>
  )
}