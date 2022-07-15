import { CollectEnum } from "../enums/collect.enum";
import { Recipe } from "../models/recipe.model";

export const GQL_INVENTORY = `
query {
    inventory {
        value,
        items {
            name,
            quantity,
            price,
        }
    }
}  
`;

export const GQL_M_CRAFT = (recipe: string) => `
mutation {
    craft(name: "${recipe}") {
        name,
        quantity,
        price
    }
}
`;

export const GQL_M_GATHER = (collect: CollectEnum) => `
mutation {
    gather(item: ${collect}) {
        name,
        quantity,
        price,
    }
}
`;

export const GQL_M_RECIPES = (recipeId?: string) => {
    const filter = recipeId ? `(_id: "${recipeId}")` : '';
    return `
    {
        recipes${filter} {
            _id,
            name,
            price,
            produceQuantity,
            ingredients {
                name,
                quantity
            }
        }
    }

    `;
};

export const GQL_M_ADD_RECIPE = (recipe: Recipe) => {
    const recipeJson = JSON.stringify(recipe);
    // remove the quotes in the property fields
    const unquoted = recipeJson.replace(/"([^"]+)":/g, '$1:');
    return `
    mutation {
        addRecipe(recipeInput: ${unquoted}) {
            _id,
            name,
            price,
            category,
            produceQuantity,
            ingredients {
                name,
                quantity
            }
        }
    }
    `;
};