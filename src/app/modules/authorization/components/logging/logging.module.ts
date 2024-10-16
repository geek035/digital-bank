import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatIconModule } from '@angular/material/icon';
import { LoggingComponent } from './logging.component';
import { LoggingRoutingModule } from './logging-routing.module';

@NgModule({
  declarations: [
    LoggingComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    LoggingRoutingModule,
  ],
})
export class LoggingModule {}
