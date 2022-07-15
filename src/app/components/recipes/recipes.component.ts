import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddRecipeDialog, AddRecipeDialogHeader } from '../../dialogs/add-recipe/add-recipe.dialog';
import { MissingIngredientsDialog, MissingIngredientsDialogHeader } from '../../dialogs/missing-ingredients/missing-ingredients.dialog';
import { getItemImage } from '../../shared/data/item-image';
import { Recipe } from '../../shared/models/recipe.model';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private http: HttpService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.initRecipelist();
  }

  private initRecipelist(): void {
    this.http.getRecipes().subscribe({
      next: (res) => {
        const recipesData = res.data?.recipes;
        if (recipesData.length) {
          this.recipes = recipesData;
          for (let recipe of recipesData) {
            for (let ing of recipe.ingredients) {
              ing.imageUrl = getItemImage(ing.name);
            }
          }
        }
      }
    });
  }

  addRecipe(): void {
    const dialogRef = this.dialogService.open(AddRecipeDialog, {
      header: AddRecipeDialogHeader,
      styleClass: 'dialog-add-recipe'
    });

    dialogRef.onClose.subscribe((recipe: Recipe) => {
      this.http.addRecipe(recipe).subscribe({
        next: (res) => {
          if (res.data) {
            this.messageService.add({
              summary: 'Successfully added recipe',
              detail: `New Recipe ${recipe.name}`,
              severity: 'success'
            });
            this.initRecipelist();
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            summary: err.message,
            detail: err.error.errors[0].message,
            severity: 'error'
          });
        }
      });
    });
  }

  cookRecipe(name: string): void {
    this.confirmationService.confirm({
      message: `Make <strong>${name}</strong>?`,
      rejectButtonStyleClass: 'p-button-outlined p-button-warning',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi',
      accept: () => { this.craft(name); },
      reject: () => {
        this.messageService.add({
          summary: 'Cancelled',
          severity: 'warn',
          detail: `User cancelled making ${name}`,
        });
      }
    });
  }

  private craft(name: string): void {
    this.http.craft(name).subscribe({
      next: (res) => {
        if (res?.data?.craft) {
          this.messageService.add({
            summary: 'Success crafted the recipe',
            detail: 'Please see your inventory',
            severity: 'success'
          });
        } else {
          const dialogRef = this.dialogService.open(MissingIngredientsDialog, {
            data: res.errors[0].extensions.exception.response,
            header: MissingIngredientsDialogHeader,
            width: '300px'
          });
        }
      }
    });

  }

}