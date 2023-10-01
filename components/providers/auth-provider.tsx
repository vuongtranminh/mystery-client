"use client";

import client from "@/app/api/client";
import { useUser } from "@/hooks/use-user";
import axios from "axios";
import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

export const AuthProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const { setUser } = useUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const data = await client.get("/user/me");
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {children}
    </>
  )
}