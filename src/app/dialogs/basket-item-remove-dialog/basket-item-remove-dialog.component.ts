import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent>{
constructor( @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState
, dialogref:MatDialogRef<BasketItemRemoveDialogComponent>)
{
  super(dialogref);
}


}
export enum BasketItemDeleteState{
  Yes, No
}
