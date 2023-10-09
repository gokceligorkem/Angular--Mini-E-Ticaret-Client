import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent extends BaseDialog<RemoveDialogComponent> {
  constructor(
     dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemoveState,
  ) {
    super(dialogRef);
  }

  
}
export enum RemoveState{
  Yes,
  No
}