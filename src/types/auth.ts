export interface JWTInfo {
  access_uuid: string;
  authorized: boolean;
  customer: User;
  exp: number;
}

export interface User {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string | null;
  password: string;
  profile_picture: string;
  status: string;
  second_status: string;
  role: string;
  last_login: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  updated_by: string | null;
}
