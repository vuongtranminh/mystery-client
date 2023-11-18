"use client";

import { globalRouter } from "@/lib/globalRouter";
import { useRouter } from "next/navigation";

const RouterProvider = ({ children }) => {

  const router = useRouter();
  globalRouter.router = router;

  return (
    <>{ children }</>
  )
}

export default RouterProvider