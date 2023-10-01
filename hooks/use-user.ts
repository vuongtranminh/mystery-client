import type { Dispatch, SetStateAction } from 'react'
import { useContext, createContext } from 'react'

interface UserSummary {
  userId: number;
  name: string;
  avatar: string;
}

interface User {
  user?: UserSummary
  setUser: Dispatch<SetStateAction<UserSummary>>
}

const UserContext = createContext<User>({
  user: undefined,
  setUser: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider = UserContext.Provider
