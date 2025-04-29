export type fetchStatus = "loading" | "success" | "error"

export interface ApiResponse<T> {
  items: T[],
  count: number,
  cursor: string | null
}

export type AuthorInfo = {
    name: string;
    photo?: string;
    sub?: string,
    email?: string,
    bio?: string
  };

export interface RecipePreview {
    id: string;
    title: string;
    description: string;
    tags: string[];
    photo: string;
    created: number;
    author_name: string,
    author_photo: string,
    author_sub: string,
    slug: string,
    likes: number
}

export interface Recipe extends RecipePreview {
    ingredients: Ingredient[],
    instructions: string[],
    yield?: number
  };

export type Ingredient = {
  qty: number,
  measure: string,
  name: string
}

export type RecipePreviewList = Recipe[];