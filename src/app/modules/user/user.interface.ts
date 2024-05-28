export type TUser = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: 'user' | 'admin';
  status: 'active' | 'block';
  token?: string;
  my_favorite: string[];
  my_card: string[];
};
export type TUserForLogin = {
  email: string;
  password: string;
};

export type TUserExtends = Document &
  TUser & {
    comparePassword(candidatePassword: string): Promise<boolean>;
  };

export type Action = 'card' | 'favorite';
