import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatherComponent } from './components/gather/gather.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inventory',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'gather',
    component: GatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
