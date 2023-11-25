import { AuthProvider } from '@/components/providers/auth-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        { children }
      </SocketProvider>
    </AuthProvider>
  )
}

export default AuthLayout