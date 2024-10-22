import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeComponent } from './user-home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    UserHomeRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
})
export class UserHomeModule {}
