import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUserDataRoutingModule } from './update-user-data-routing.module';
import { UpdateUserDataComponent } from './update-user-data.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';


@NgModule({
  declarations: [
    UpdateUserDataComponent,
  ],
  imports: [
    CommonModule,
    UpdateUserDataRoutingModule,
    CommonComponentsModule,
    CustomPipesModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateUserDataModule { }
