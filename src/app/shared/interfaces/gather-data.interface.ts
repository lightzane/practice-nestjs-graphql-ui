import { GraphQLError } from "./error-data.interface";
import { Item } from "../models/item.model";

export interface GatherData {
    data: { gather: Item[]; };
    errors: GraphQLError[];
}