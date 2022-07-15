import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { getItemImage } from '../data/item-image';
import { CollectEnum } from '../enums/collect.enum';
import { GQL_M_CRAFT, GQL_INVENTORY, GQL_M_GATHER, GQL_M_RECIPES, GQL_M_ADD_RECIPE } from '../graphql/gql';
import { AddRecipeData } from '../interfaces/add-recipe-data.interface';
import { CraftData } from '../interfaces/craft-data.interface';
import { GatherData } from '../interfaces/gather-data.interface';
import { InventoryData } from '../interfaces/inventory-data.interface';
import { RecipesData } from '../interfaces/recipes.data';
import { Item } from '../models/item.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private graphQL<T>(query: string): Observable<T> {
    query = JSON.stringify(query).replace(/\\n|\"/g, '').replace(/\\/g, '"');
    return this.http.post<T>(`/graphql`, { query });
  }

  private attachImage(items: Item[] | Recipe[]): void {
    for (let item of items) {
      if (!item) { continue; }
      item.imageUrl = getItemImage(item.name);
    }
  }

  getInventory(): Observable<InventoryData> {
    return this.graphQL<InventoryData>(GQL_INVENTORY)
      .pipe(
        tap(res => { this.attachImage(res.data?.inventory?.items); })
      );
  }

  gather(collect: CollectEnum): Observable<GatherData> {
    return this.graphQL<GatherData>(GQL_M_GATHER(collect))
      .pipe(
        tap(res => { this.attachImage(res.data?.gather); })
      );
  }

  getRecipes(recipeId?: string): Observable<RecipesData> {
    return this.graphQL<RecipesData>(GQL_M_RECIPES(recipeId))
      .pipe(
        tap(res => { this.attachImage(res.data?.recipes); })
      );
  }

  craft(recipe: string): Observable<CraftData> {
    return this.graphQL<CraftData>(GQL_M_CRAFT(recipe))
      .pipe(
        tap(res => { this.attachImage([res?.data?.craft]); })
      );
  }

  addRecipe(recipe: Recipe): Observable<AddRecipeData> {
    return this.graphQL<AddRecipeData>(GQL_M_ADD_RECIPE(recipe));
  }
}
