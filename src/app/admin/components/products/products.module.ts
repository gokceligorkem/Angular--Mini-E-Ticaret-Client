import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddproductsComponent } from './addproducts/addproducts.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModule } from 'src/app/directives/admin/delete.module';


@NgModule({
  declarations: [
    ProductsComponent,
    AddproductsComponent,
    
    

    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"addproducts",component:AddproductsComponent},
      {path:"listproducts",component:ProductsComponent},
      

    ]),
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatTableModule,MatPaginatorModule,MatIconModule, MatDialogModule,MatButtonModule,
    FileUploadModule,
    DialogModule,
    DeleteModule
  ]
})
export class ProductsModule {
;
 }
