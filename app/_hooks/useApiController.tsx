'use client'

import { useAuth } from "./useAuth";
import { RecipeController, UserController } from "../_utils/apiController";
import { useRef } from "react";

export function useApiController(
) {
  const { access, refresh } = useAuth();
  const Users = useRef<UserController>(new UserController(access, refresh));
  const Recipes = useRef<RecipeController>(new RecipeController(access, refresh));


  return {Users: Users.current, Recipes: Recipes.current};
}