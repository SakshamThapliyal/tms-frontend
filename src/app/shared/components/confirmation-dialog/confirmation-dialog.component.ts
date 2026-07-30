import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      confirmText: string;
      cancelText: string;
    },
  ) {}

  // Cancel
  protected cancel(): void {
    this.dialogRef.close(false);
  }

  // Confirm
  protected confirm(): void {
    this.dialogRef.close(true);
  }
}
