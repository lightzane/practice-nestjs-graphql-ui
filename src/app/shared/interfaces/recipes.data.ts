import { Recipe } from "../models/recipe.model";
import { GraphQLError } from "./error-data.interface";

export interface RecipesData {
    data: { recipes: Recipe[]; };
    errors: GraphQLError;
}