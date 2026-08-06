export interface LogUserReference {
  _id: string;
  name?: string;
}

export interface UserLog {
  _id: string;

  user?: LogUserReference;

  userId?: string | LogUserReference;

  userName?: string;
  username?: string;

  action: string;

  timestamp?: string;
  createdAt?: string;
}