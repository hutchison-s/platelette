import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthorInfo } from "../types";
import { UserController } from "./apiController";

export const codeForToken = async (code: string)=>{
    const res = await fetch(`https://api.platelette.com/auth?code=${code}`, {credentials: 'include', method: 'GET', headers: {'Accept': "application/json"}});
    if (!res.ok) {
        console.log('response status', res.status);
        return null;
    }
    const tokens = await res.json();
    return tokens;
}

export const tokenToUser = async (id_token: string, access_token: string) => {
    const userInfo = jwt.decode(id_token) as JwtPayload;
    if (userInfo && userInfo.given_name) {
        const profile = await getProfile(userInfo.sub, access_token)
        if (!profile) {
            console.log('no profile returned');
            return null;
        }
        return profile as AuthorInfo
    }
    return null;
}

export const getProfile = async (sub?: string, access?: string)=>{
    if (!sub || !access) return null;
    const controller = new UserController(access, refreshAuthTokens);
    return await controller.getOne(sub);
}

export const refreshAuthTokens = async () => {
    const res = await fetch('https://api.platelette.com/auth/refresh', {credentials: 'include'});
    if (!res.ok) {
        console.log(res.status);
        return null;
    }
    const tokens = await res.json();
    return tokens;

}

export const getExpiry = async (access_token: string) => {
    const decoded = jwt.decode(access_token) as JwtPayload;
    return decoded.exp ?? null
}

export async function fetchWithAuth(url: string, options: RequestInit = {}, accessToken: string, refreshAccessToken: () => Promise<string | null>) {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${accessToken}`,
      }
    });
  
    if (response.status === 401) {
      // Access token has expired, attempt to refresh
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the original request with the new token
        const newOptions = {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${newAccessToken}`
            }
        }
        return await fetch(url, newOptions);
      } else {
        throw new Error("Unable to refresh access token.");
      }
    }
  
    return response;
  }
  