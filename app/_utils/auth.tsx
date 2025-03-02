import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthorInfo } from "../types";
import { UserController } from "./apiController";

export const codeForToken = async (code: string)=>{
    const res = await fetch(`https://api.platelette.com/auth?code=${code}`, {method: 'GET', headers: {'Accept': "application/json"}});
    if (!res.ok) {
        console.log('response status', res.status);
        return null;
    }
    const token = await res.json();
    localStorage.setItem('jwt', token.id_token);
    return token;
}

export const tokenToUser = async (id_token: string) => {
    const userInfo = jwt.decode(id_token) as JwtPayload;
    if (userInfo && userInfo.given_name) {
        const profile = await getProfile(userInfo.sub)
        if (!profile) {
            console.log('no profile returned');
            return null;
        }
        return profile as AuthorInfo
    }
}

export const getProfile = async (sub?: string)=>{
    if (!sub) return null;
    const controller = new UserController();
    return await controller.getOne(sub);
}