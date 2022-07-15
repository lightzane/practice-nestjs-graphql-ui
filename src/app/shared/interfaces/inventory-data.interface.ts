import { GraphQLError } from "./error-data.interface";
import { Inventory } from "../models/inventory.model";

export interface InventoryData {
    data: { inventory: Inventory; };
    errors: GraphQLError[];
}