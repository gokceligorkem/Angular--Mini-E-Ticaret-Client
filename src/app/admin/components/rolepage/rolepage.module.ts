import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolepageComponent } from './rolepage.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModule } from 'src/app/directives/admin/delete.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';




@NgModule({
  declarations: [
    RolepageComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:RolepageComponent}
    ]),
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatTableModule,MatPaginatorModule,MatIconModule, MatDialogModule,
    FileUploadModule,
    DeleteModule,
   
  ]
})
export class RolepageModule { }
