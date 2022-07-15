import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Item } from '../../shared/models/item.model';

export const MissingIngredientsDialogHeader = 'Missing Ingredients';

@Component({
  selector: 'app-missing-ingredients',
  templateUrl: './missing-ingredients.dialog.html',
  styleUrls: ['./missing-ingredients.dialog.scss']
})
export class MissingIngredientsDialog implements OnInit {

  missingIngredients: Item[] = [];

  constructor(private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.missingIngredients = this.dialogConfig.data['missingIngredients'];
  }

}
