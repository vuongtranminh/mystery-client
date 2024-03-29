export interface Profile {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;

  servers: Server[];
  members: Member[];
  channels: Channel[];

  createdAt: string;
  updatedAt: string;
}

export interface Server {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;

  profileId: string;
  profile: Profile;

  members: Member[];
  channels: Channel[];

  createdAt: string;
  updatedAt: string;
}

export enum MemberRole {
  ADMIN,
  MODERATOR,
  GUEST
}

export interface Member {
  id: string;
  role: MemberRole;

  profileId: string;
  profile: Profile;

  serverId: string;
  server: Server;

  messages: Message[];
  directMessages: DirectMessage[];

  conversationsInitiated: Conversation[];
  conversationsReceived: Conversation[];

  createdAt: string;
  updatedAt: string;
}

export enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;

  profileId: string;
  profile: Profile;

  serverId: string;
  server: Server;

  messages: Message[];

  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;

  fileUrl?: string;

  memberId: string;
  member: Member;

  channelId: string;
  channel: Channel;

  deleted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;

  memberOneId: string;
  memberOne: Member;

  memberTwoId: string;
  memberTwo: Member;

  directMessages: DirectMessage[];
}

export interface DirectMessage {
  id: string;
  content: string;
  fileUrl?: string;

  memberId: string;
  member: Member;

  conversationId: string;
  conversation: Conversation;

  deleted: boolean;

  createdAt: string;
  updatedAt: string;
}