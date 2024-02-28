export interface User {
  user_id: string;
  Fname: string;
  Lname?: string;
  email: string;
  role: string;
  created_at: string;
  password: string;
  phone_number: string;
  isdeleted: boolean;
}

export interface loginUserDetails {
  user_id: string;
  name: string;
  email: string;
  role: string;
}
