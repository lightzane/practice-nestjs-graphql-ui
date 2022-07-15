import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { GatherComponent } from './components/gather/gather.component';
import { MissingIngredientsDialog } from './dialogs/missing-ingredients/missing-ingredients.dialog';
import { AddRecipeDialog } from './dialogs/add-recipe/add-recipe.dialog';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipesComponent,
    GatherComponent,
    MissingIngredientsDialog,
    AddRecipeDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
