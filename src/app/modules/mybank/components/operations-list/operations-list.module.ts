import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsListRoutingModule } from './operations-list-routing.module';
import { OperationsListComponent } from './operations-list.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';

@NgModule({
  declarations: [OperationsListComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CustomPipesModule,
    OperationsListRoutingModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class OperationsListModule {}
