"use client"

import mystery from "@/app/api/mystery"

export default function Test() {

  const handleLogout = async () => {
    await mystery.post("/auth/logout")
  }

  return <button onClick={handleLogout}>Logout</button>
}