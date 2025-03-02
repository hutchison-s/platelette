export type fetchStatus = "loading" | "success" | "error"

export type AuthorInfo = {
    name: string;
    photo?: string;
    sub?: string,
    email?: string
  };

export interface RecipePreview {
    id: string;
    title: string;
    description: string;
    tags: string[];
    photo: string;
    created: string;
    author: AuthorInfo;
    slug: string,
}

export interface Recipe extends RecipePreview {
    ingredients: Ingredient[],
    instructions: string[],
    yield?: number
  };

  export enum MeasurementUnit {
    // Volume
    Teaspoon = "tsp",
    Tablespoon = "tbsp",
    FluidOunce = "fl_oz",
    Cup = "cup",
    Pint = "pt",
    Quart = "qt",
    Gallon = "gal",
    Milliliter = "ml",
    Liter = "l",
  
    // Weight
    Ounce = "oz",
    Pound = "lb",
    Gram = "g",
    Kilogram = "kg",
  
    // Count-Based
    Piece = "piece",
    Slice = "slice",
    Clove = "clove",
    Stick = "stick",
    Pinch = "pinch",
    Dash = "dash"
  }  

export type Ingredient = {
  qty: number,
  measure: MeasurementUnit,
  name: string
}

export type RecipePreviewList = Recipe[];