import { GraphQLError } from "./error-data.interface";
import { Item } from "../models/item.model";

export interface CraftData {
    data: { craft: Item; };
    errors: GraphQLError[];
}