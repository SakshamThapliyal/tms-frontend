import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Router
import { RouterModule } from '@angular/router';
// Angular Material
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskStatusPipe } from './pipes/task-status.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    TaskStatusPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    NavbarComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    TaskStatusPipe,
  ],
})
export class SharedModule {}
