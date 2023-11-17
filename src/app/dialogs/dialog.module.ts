import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {  MatButton, MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar'
import { OrdercompleteComponent } from './ordercomplete/ordercomplete.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge'
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';


@NgModule({
  declarations: [
    RemoveDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    OrderDetailDialogComponent,
    OrdercompleteComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,MatCardModule,
    FileUploadModule,MatTableModule,
    MatToolbarModule,MatBadgeModule,MatListModule,
    MatFormFieldModule,
    MatInputModule,
    NgxScannerQrcodeModule

 
    
    
  ]
})
export class DialogModule { }
