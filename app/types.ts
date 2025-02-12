export type User = {
    name: string;
    photo: string;
  };

export interface RecipePreview {
  id: number;
    title: string;
    desc: string;
    tags: string[];
    photo: string;
    timestamp: string;
    user: User;
    slug: string,
}

export interface Recipe extends RecipePreview {
    ingredients: Ingredient[],
    method: string[],
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