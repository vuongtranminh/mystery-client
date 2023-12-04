"use client";

import axios from "axios";
import qs from "query-string";
import { 
  Check,
  Gavel,
  Loader2,
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { MemberRole } from "@/prisma/schema";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import memberApi, { memberEndpoints } from "@/app/api/member.api";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useMemberQuery } from "@/hooks/use-member-query";
import { Input } from "../ui/input";
import { useSocket } from "@/components/providers/socket-provider";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

export const MembersModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const [searchKey, setSearchKey] = useState("");
  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === "members";
  const { server } = data;

  const {
    data: dataMembers,
    hasNextPage,
    hasPreviousPage,
    isFirst,
    isLast,
    status,
    fetchNextPageStatus,
    setInfo,
    fetchNextPage
  } = useMemberQuery({
    apiUrl: memberEndpoints.getMembersByServerId,
    params: {
      serverId: server?.serverId,
      pageSize: 30
    },
    condition: isModalOpen
  });

  // realtime User
  const { socket } = useSocket();
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    if (!socket) {
      return;
    }

    socket.on("memberEvent:1", (member) => {
      if (server?.serverId !== member.serverId) {
        return;
      }

      setInfo((oldData) => ({
        ...oldData,
        data: {
          content: [member, ...oldData.data.content],
          meta: oldData.data.meta
        }
      }));
    })

    socket.on("memberEvent:2", (member) => {
      if (server?.serverId !== member.serverId) {
        return;
      }

      setInfo((oldData) => {
        const memberUpdateIndex = oldData.data.content.findIndex(item => item.memberId === member.memberId);
        if (memberUpdateIndex === -1) {
          return oldData;
        }

        const newContent = [...oldData.data.content];
        newContent.splice(memberUpdateIndex, 1, member);
        return {
          ...oldData,
          data: {
            content: newContent,
            meta: oldData.data.meta
          }
        };
      });
    })

    socket.on("memberEvent:3", (member) => {
      if (server?.serverId !== member.serverId) {
        return;
      }

      setInfo((oldData) => {
        const memberDeleteIndex = oldData.data.content.findIndex(item => item.memberId === member.memberId);
        if (memberDeleteIndex === -1) {
          return oldData;
        }

        const newContent = [...oldData.data.content];
        newContent.splice(memberDeleteIndex, 1);
        return {
          ...oldData,
          data: {
            content: newContent,
            meta: oldData.data.meta
          }
        };
      });
    })

    return () => {
      socket.off("memberEvent:1");
      socket.off("memberEvent:2");
      socket.off("memberEvent:3");
    }
  }, [socket, isModalOpen]);

  const onKick = async (memberId) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  const onRoleChange = async (memberId, role) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  const handleSearchMember = (event) => {
    setSearchKey(searchKey);

    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription 
            className="text-center text-zinc-500"
          >
            {dataMembers?.meta?.totalElements} Members
          </DialogDescription>
          <Input type="text" placeholder="Search member..." onChange={handleSearchMember} value={searchKey} />
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {dataMembers?.content?.map((member) => (
            <div key={member.memberId} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.avtUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.name}
                  {roleIconMap[member.role]}
                </div>
                {/* <p className="text-xs text-zinc-500">
                  {member.profile.email}
                </p> */}
              </div>
              {server.profileId !== member.profileId && loadingId !== member.memberId && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                          className="flex items-center"
                        >
                          <ShieldQuestion
                            className="w-4 h-4 mr-2"
                          />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.memberId, "GUEST")}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check
                                  className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.memberId, "MODERATOR")}
                            >
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check
                                  className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onKick(member.memberId)}
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.memberId && (
                <Loader2
                  className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}