export type User = {
    name: string;
    photo: string;
  };
  
export type Recipe = {
    id: number;
    title: string;
    desc: string;
    tags: string[];
    photo: string;
    timestamp: string;
    user: User;
  };

export type RecipePreviewList = Recipe[];