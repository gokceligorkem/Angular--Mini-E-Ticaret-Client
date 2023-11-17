import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ordercomplete',
  templateUrl: './ordercomplete.component.html',
  styleUrls: ['./ordercomplete.component.scss']
})
export class OrdercompleteComponent extends BaseDialog<OrdercompleteComponent> {
  constructor(dialogRef: MatDialogRef<OrdercompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState) {
    super(dialogRef)
  }
  complete(){

  }

}
export enum CompleteOrderState {
  Yes,
  No
}