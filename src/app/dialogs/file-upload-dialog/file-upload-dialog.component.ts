import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RemoveState } from '../remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent>{
  constructor(
    dialogRef:MatDialogRef<FileUploadDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: RemoveState,){
    
    super(dialogRef);
  }
}
export enum FileUploadDialogState{
  Yes,
  No
}