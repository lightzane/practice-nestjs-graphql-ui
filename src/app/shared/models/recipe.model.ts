import { Ingredient } from "./ingredient.model";

export class Recipe {
    _id?: string;
    name: string;
    ingredients: Ingredient[];
    price?: number;
    category?: string;
    produceQuantity: number;
    imageUrl?: string;
}