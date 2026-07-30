import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Layout
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Navigation
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Data Display
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';

// Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Date & Time
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Feedback
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [
    CommonModule,

    // Layout
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,

    // Navigation
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    // Data Display
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,

    // Form Controls
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,

    // Date & Time
    MatDatepickerModule,
    MatNativeDateModule,

    // Feedback
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    // Layout
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,

    // Navigation
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    // Data Display
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,

    // Form Controls
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,

    // Date & Time
    MatDatepickerModule,
    MatNativeDateModule,

    // Feedback
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
