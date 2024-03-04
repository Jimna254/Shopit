export interface registerUser {
  Fname: string;
  Lname: string;
  email: string;
  created_at: string;
  phone_number: string;
  password: string;
}

export interface loginDetails {
  name: string;
  email: string;
}

export interface usersResponse {
  users: [
    user_id: string,
    Fname: string,
    Lname: string,
    email: string,
    created_at: string,
    phone_number: string,
    password: string
  ];
  error: {
    name: string;
    message: string;
  };
  messageerror: string;
}

export interface userResponse {

    user_id: string,
    Fname: string,
    Lname: string,
    email: string,
    created_at: string,
    phone_number: string,
    password: string
  }


export interface updateUser {
  user_id: string;
  Fname: string;
  Lname: string;
  email: string;
  created_at: string;
  phone_number: string;
  password: string;
}
