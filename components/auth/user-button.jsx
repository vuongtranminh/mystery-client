"use client"

import { LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "../providers/auth-provider";
import authApi from "@/app/api/auth.api";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/sign-in/deleteAllCookies");
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={cn("h-[48px] w-[48px]")}>
          <AvatarImage src={user?.avtUrl} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={10}
        className="mb-4 w-auto"
      >
        <div className="rounded py-8">
          <div className="px-8 flex flex-col items-center">
            <Avatar className={cn("h-7 w-7 md:h-16 md:w-16 mb-4")}>
              <AvatarImage src={user?.avtUrl} />
            </Avatar>
            <div className="text-2xl font-bold text-center overflow-ellipsis whitespace-nowrap overflow-hidden">Hi, {user?.name}!</div>
            {/* <div className="text-center mb-6">{user?.email}</div> */}
          </div>
          
          <div className="px-8 w-full flex">
            <Button variant="primary" className="mr-2">
              <Settings className="mr-2" /> <span className="whitespace-nowrap">Manage account</span>
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              <LogOut className="mr-2" /> <span className="whitespace-nowrap">Sign out</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}