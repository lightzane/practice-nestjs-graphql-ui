import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DATA_ITEM_IMAGE } from '../../shared/data/item-image';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Recipe } from '../../shared/models/recipe.model';
import { HttpService } from '../../shared/services/http.service';

export const AddRecipeDialogHeader = 'Add Recipe';
interface Category {
  name: string;
}

const defaultAddRecipeForm: Partial<Recipe> = {
  category: 'savory',
  produceQuantity: 1,
  price: 0
};

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.dialog.html',
  styleUrls: ['./add-recipe.dialog.scss']
})
export class AddRecipeDialog implements OnInit {

  sampleForm: FormGroup;

  categories: Category[];
  existingRecipes: Recipe[];
  filteredRecipes: Recipe[] = [];
  addedIngredients: Ingredient[] = [];

  // ngModels
  inputIngredient: Recipe = null;
  inputIngredientQuantity = 0;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initDropdownDefaultValues();
    this.initRecipeList();
    this.initSampleForm();
  }

  private initDropdownDefaultValues(): void {
    this.categories = [
      {
        name: 'savory'
      },
      {
        name: 'sweet'
      }
    ];
  }

  private initRecipeList(): void {
    this.http.getRecipes().subscribe({
      next: (res) => {
        const recipesData = res.data?.recipes;
        if (recipesData.length) {
          this.existingRecipes = recipesData;
          // add sub ingredients
          const subIngredients = [];
          for (let recipe of recipesData) {
            for (let ingredient of recipe.ingredients) {
              const isExist = recipesData.find(r => r.name.toLowerCase() === ingredient.name.toLowerCase());
              const isPushed = subIngredients.find(i => i.name === ingredient.name);
              if (isExist || isPushed) { continue; }
              subIngredients.push({
                name: ingredient.name
              });
            }
          }
          this.existingRecipes.push(...subIngredients);
        }
      }
    });
  }

  private initSampleForm(): void {
    this.sampleForm = this.fb.group({
      name: ['', Validators.required],
      price: [defaultAddRecipeForm.price, Validators.required],
      produceQuantity: [defaultAddRecipeForm.produceQuantity, [Validators.required, Validators.min(1)]],
      category: ['savory'],
      imageUrl: ['', Validators.required]
    });
  }

  filterRecipes(event: any) {
    let filtered: Recipe[] = [];
    let query = event.query as string;
    for (let i = 0; i < this.existingRecipes.length; i++) {
      let item = this.existingRecipes[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(item);
      }
    }
    this.filteredRecipes = filtered;
  }

  addIngredient(): void {
    if (!this.inputIngredient || !this.inputIngredientQuantity) { return; }

    this.addedIngredients.push({
      name: this.inputIngredient.name || (this.inputIngredient as unknown) as string,
      quantity: this.inputIngredientQuantity
    });
    this.inputIngredient = null;
    this.inputIngredientQuantity = 0;
  }

  removeIngredient(index: number): void {
    this.addedIngredients.splice(index, 1);
  }

  submitRecipe(): void {

    const recipe: Recipe = {
      ...this.sampleForm.value,
      ingredients: this.addedIngredients
    };

    DATA_ITEM_IMAGE.push({
      name: recipe.name,
      imageUrl: recipe.imageUrl
    });

    this.sampleForm.reset(defaultAddRecipeForm);
    this.addedIngredients = [];

    // delete imageUrl because it is not a defined property in the server
    delete recipe.imageUrl;

    this.dialogRef.close(recipe);
  }

}
