import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModule } from 'src/app/directives/admin/delete.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,MatPaginatorModule,
    RouterModule.forChild([
      {path:"",component:UsersComponent}
    ]),
    MatButtonModule,
    MatTableModule,MatPaginatorModule,MatIconModule, MatDialogModule,MatButtonModule,
    DialogModule,
    DeleteModule
  ]
})
export class UsersModule { }
