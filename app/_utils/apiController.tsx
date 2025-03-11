import { ApiResponse, AuthorInfo, Recipe } from "../types";
import { fetchWithAuth } from "./auth";

export class ApiController<T> {
    protected BASE: string;
    protected includeCredentials: boolean;
    protected bearer: string;
    protected refreshtokens: ()=>Promise<string | null>;

    constructor(baseURL: string, credentialed: boolean = false, bearer: string = '', refreshTokens: ()=>Promise<string | null>) {
        this.BASE = baseURL;
        this.includeCredentials = credentialed;
        this.bearer = bearer;
        this.refreshtokens = refreshTokens;
    }
    protected async safeGET(endpoint: string) : Promise<ApiResponse<T> | null> {
        const opts: RequestInit = {
            method: 'GET',
            credentials: this.includeCredentials ? 'include' : undefined,
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${this.bearer}`
            }
        }
        if (this.includeCredentials) {
            return await fetchWithAuth(this.BASE+endpoint, opts, this.bearer, this.refreshtokens)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
                return null;
            });
        } else {
            return await fetch(this.BASE+endpoint, opts)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
                return null;
            });
        }
        
    }
    protected async safePOST(endpoint: string, payload: Partial<T>) : Promise<Response | null> {
        const opts: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${this.bearer}`
            },
            body: JSON.stringify(payload)
        }
        return await fetchWithAuth(this.BASE+endpoint, opts, this.bearer, this.refreshtokens)
            .catch(err => {
                console.error(err);
                return null;
            });
    }
    protected async safePUT(endpoint: string, payload: T) : Promise<Response | null> {
        const opts: RequestInit = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${this.bearer}`
            },
            body: JSON.stringify(payload)
        }
        return await fetchWithAuth(this.BASE+endpoint, opts, this.bearer, this.refreshtokens)
            .catch(err => {
                console.error(err);
                return null;
            });
    }

    async getAll() {
        return this.safeGET('');
    }
    async getOne(id: string): Promise<T | null> {
        const endpoint = '/'+id;
        const opts: RequestInit = {
            method: 'GET',
            credentials: this.includeCredentials ? 'include' : undefined,
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${this.bearer}`
            }
        }
        if (this.includeCredentials) {
            return await fetchWithAuth(this.BASE+endpoint, opts, this.bearer, this.refreshtokens)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
                return null;
            });
        } else {
            return await fetch(this.BASE+endpoint, opts)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
                return null;
            });
        }
    }
    async getQuery(params: Record<string, string | number>) {
        if (Object.keys(params).length == 0) {
            return this.getAll;
        }
        const qString = ['?'];
        for (const param in params) {
            qString.push(`${qString.length > 1 ? '&' : ''}${param}=${params[param]}`);
        }
        return this.safeGET(qString.join(''));
    }
    async create(payload: Partial<T>, endpoint?: string) {
        return this.safePOST(endpoint || '', payload);
    }
    async update(payload: T, endpoint?: string) {
        return this.safePUT(endpoint || '', payload);
    }
}

export class RecipeController extends ApiController<Recipe> {
    constructor(access_token: string = '', refresh: ()=>Promise<string | null>) {
        super('https://api.platelette.com/recipes', access_token !== '', access_token, refresh);
    }

    async getBySlug(slug: string) {
        return this.safeGET(`?slug=${slug}`);
    }
    async getByAuthor(author_id: string) {
        return this.safeGET(`?author_id=${author_id}`);
    }
    async getPopular(cursor: string | null, limit?: number) {
        const limitString = limit ? `&limit=${limit}` : '';
        const cursorString = cursor ? `&cursor=${cursor}` : '';
        return this.safeGET(`?sort=popular${limitString}${cursorString}`);
    }
    async getLatest(cursor: string | null, limit?: number) {
        const limitString = limit ? `&limit=${limit}` : '';
        const cursorString = cursor ? `&cursor=${cursor}` : '';
        return this.safeGET(`?sort=latest${limitString}${cursorString}`);
    }
}


export class UserController extends ApiController<AuthorInfo> {
    constructor(access_token: string = '', refresh: ()=>Promise<string | null>) {
        super('https://api.platelette.com/accounts', access_token !== '', access_token, refresh);
    }
}