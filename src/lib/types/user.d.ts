export interface AccountProfile {
  user: User;
  btnText: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
}
