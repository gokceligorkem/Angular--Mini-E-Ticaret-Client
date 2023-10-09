import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {  MatButton, MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { SelectProductImageDialogComponent } from '../select-product-image-dialog/select-product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RemoveDialogComponent,
    SelectProductImageDialogComponent,
    
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,MatCardModule,
    FileUploadModule,
 
    
    
  ]
})
export class DialogModule { }
