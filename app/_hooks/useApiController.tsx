'use client'

import { useAuth } from "./useAuth";
import { RecipeController, UserController } from "../_utils/apiController";
import { useCallback } from "react";

export function useApiController(
) {
  const { access, refresh } = useAuth();

  const Users = useCallback(()=>new UserController(access, refresh), [access, refresh]);
  const Recipes = useCallback(()=>new RecipeController(access, refresh), [access, refresh]);


  return {Users, Recipes};
}