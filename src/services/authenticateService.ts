import { myAxios } from "./helper";

// 1. Define the shape of the credentials you send
export interface LoginCredentials {
  username: string
  password: string
}

export const login = (credentials: LoginCredentials) => {

    console.log("sending data to backend");
    console.log(credentials.username);
    console.log(credentials.password);
    
    return myAxios.post('/login', credentials).then((response) => response.data)
}