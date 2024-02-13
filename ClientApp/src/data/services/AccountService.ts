import httpClient from "../httpClient";
import { LoginData } from "../model/LoginModel";

const RESOURCE = "/account";

const AccountService = {
  login(LoginData: LoginData) {
    const loginBody: LoginData = {
      Email: LoginData.Email,
      Password: LoginData.Password,
    };
    return httpClient.post(`${RESOURCE}/login`, loginBody);
  },
  register() {
    throw new Error("Not implemented action!");
  },
};

export const login = async (loginBody: LoginData): Promise<any> => {
  try {
    const response = await AccountService.login(loginBody);

    // if (!response.data) throw new Error("No data");

    const token = response.data;
    return token;
  } catch (error: any) {
    // Check if it's an Axios error and log detailed information
    if (error.response) {
      // Access and log Axios error response details
      //TODO: Hide it in production?
      console.error("Axios error:", error);
    }

    return error.response.data;
  }
};
