import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeDialog } from './add-recipe.dialog';

describe('AddRecipeDialog', () => {
  let component: AddRecipeDialog;
  let fixture: ComponentFixture<AddRecipeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
