import { Recipe } from "../models/recipe.model";
import { GraphQLError } from "./error-data.interface";

export interface AddRecipeData {
    data: { addRecipe: Recipe; },
    errors: GraphQLError;
}