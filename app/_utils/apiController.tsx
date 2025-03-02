import { ApiResponse, AuthorInfo, Recipe } from "../types";

export class ApiController<T> {
    protected BASE: string;
    protected includeCredentials: boolean;

    constructor(baseURL: string, credentialed: boolean = false) {
        this.BASE = baseURL;
        this.includeCredentials = credentialed
    }
    protected async safeGET(endpoint: string) : Promise<ApiResponse<T> | null> {
        return await fetch(this.BASE+endpoint, {credentials: this.includeCredentials ? 'include' : undefined})
            .then(res => res.json())
            .catch(err => {
                console.error(err);
                return null;
            });
    }
    protected async safePOST(endpoint: string, payload: Partial<T>) : Promise<Response | null> {
        return await fetch(this.BASE+endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .catch(err => {
                console.error(err);
                return null;
            });
    }
    protected async safePUT(endpoint: string, payload: T) : Promise<Response | null> {
        return await fetch(this.BASE+endpoint, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .catch(err => {
                console.error(err);
                return null;
            });
    }
    async getAll() {
        return this.safeGET('');
    }
    async getOne(id: string): Promise<T | null> {
        return fetch(`${this.BASE}/${id}`, {credentials: this.includeCredentials ? 'include' : undefined})
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            return null;
        });
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
    constructor() {
        super('https://api.platelette.com/recipes');
    }

    async getBySlug(slug: string) {
        return this.safeGET(`?slug=${slug}`);
    }
    async getByAuthor(author_id: string) {
        return this.safeGET(`?author_id=${author_id}`);
    }
}


export class UserController extends ApiController<AuthorInfo> {
    constructor() {
        super('https://api.platelette.com/accounts', true);
    }
}