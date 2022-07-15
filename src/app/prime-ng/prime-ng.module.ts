import { NgModule } from '@angular/core';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DockModule } from 'primeng/dock';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ],
  exports: [
    RippleModule,
    ButtonModule,
    ListboxModule,
    CardModule,
    ImageModule,
    BadgeModule,
    TooltipModule,
    ToastModule,
    ToolbarModule,
    DockModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    AutoCompleteModule,
    DividerModule,
    MenubarModule
  ]
})
export class PrimeNgModule { }
