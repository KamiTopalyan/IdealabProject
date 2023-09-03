import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import axios from "axios"

const url = process.env.NODE_ENV === 'production' ? 'http://178.244.224.244:3001' : 'http://localhost:3001';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = url;

async function fetchData(endpoint: string, method: "post" | "get" | "patch" | "delete", data = {}) {
    const response = await axios({
      method: method,
      url: url + endpoint,
      data: data,
    });
    
    if (response.status === 200 || response.status === 201) {
        return response;
    } else if(response.status === 403) {
      return response;
    } else {
        const errorBody = await response.data();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", "get");
    return response.data;
}


export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const refreshTokenExp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const accessTokenExp = new Date(Date.now() + 1000 * 60 * 15);

    localStorage.setItem("refreshTokenExp", refreshTokenExp.toISOString());
    localStorage.setItem("accessTokenExp", accessTokenExp.toISOString());

    const response = await fetchData("/api/users/signup", "post", credentials);
    return response.data;
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> 
{
    const refreshTokenExp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    const accessTokenExp = new Date(Date.now() + 1000 * 60 * 15);

    localStorage.setItem("refreshTokenExp", refreshTokenExp.toISOString());
    localStorage.setItem("accessTokenExp", accessTokenExp.toISOString());

    const response = await fetchData("/api/users/login", "post", credentials);
    return response.data;
}

export async function refresh(): Promise<User> {
    const response = await axios.post("/api/users/refresh")
    if(response.status === 200) {
        const accessTokenExp = new Date(Date.now() + 1000 * 60 * 15);
        localStorage.setItem("accessTokenExp", accessTokenExp.toISOString());
    }
    return response.data;
}

export async function logout() {
    const response = await fetchData("/api/users/logout", "post");

    if(response.status === 200) {
        localStorage.removeItem("accessTokenExp");
        localStorage.removeItem("refreshTokenExp");
    }
    return response;
}




