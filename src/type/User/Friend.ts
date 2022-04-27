export enum FriendStatus {
  PENDING = 'pending',
  ACCEPT = 'accept',
  REFUSE = 'refuse',
}

export type Friend = {
  id: string;
  status: FriendStatus;
}
