import axios from "axios";
import { myAxios } from "./helper";

// 1. Define the shape of the credentials you send
export interface LoginCredentials {
  username: string
  password: string
}

export interface TempUser {
  email: string
  password: string
  username: string
}


// login API
export const login = async(credentials: LoginCredentials) => {

  console.log("sending data to backend");
  console.log(credentials.username);
  console.log(credentials.password);
    
  return await myAxios.post('/login', credentials).then((response) => response.data)
}

export const register = async (user: TempUser) : Promise<any> => {
  console.log("sending data to backend");
  console.log(user.email);
  console.log(user.password);
  console.log(user.username);

  const response = await myAxios.post("/user/", user)
  return response.data

}

export const validateToken = async (token: string): Promise<{username: string}> => {
  try{
    const response = await myAxios.post(
      "/api/auth/validate", // endpoint
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
  catch(error) {
    throw new Error("Token validation failed")
  }
};