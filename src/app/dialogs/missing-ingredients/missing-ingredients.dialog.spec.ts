import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingIngredientsDialog } from './missing-ingredients.dialog';

describe('MissingIngredientsDialog', () => {
  let component: MissingIngredientsDialog;
  let fixture: ComponentFixture<MissingIngredientsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingIngredientsDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingIngredientsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
