export interface User {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  role: "user" | "artist";
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: "user" | "artist";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}
