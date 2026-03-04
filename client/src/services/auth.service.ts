import axiosClient from "../api/axios";
import type { RegisterData, LoginData, AuthResponse } from "../types";

export const authService = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await axiosClient.post("/auth/logout");
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
