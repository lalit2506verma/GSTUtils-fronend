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