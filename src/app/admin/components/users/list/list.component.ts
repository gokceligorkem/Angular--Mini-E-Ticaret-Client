import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/user/listuser';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  constructor(snipper:NgxSpinnerService,
    private httpClient:HttpClientService,
    private userService:UserService,
    private alertifService:AlertifyService,
    private dialogSerivce:DialogService,

    ){
    super(snipper);
  }
  
  displayedColumns: string[] = ['userName','nameSurname','email','twoFactorEnabled','role','delete'];
  dataSource :MatTableDataSource<List_User>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
async getUsers(){
 
  this.spinnerShow(spinnerType.Ballclimbingdot)
  const allUsers:{totalUsersCount:number,users:List_User[]} =
  await  this.userService.getAllUsers
  (this.paginator?this.paginator.pageIndex : 0,
    this.paginator?this.paginator.pageSize:5,
    ()=>this.spinnerHide(spinnerType.Ballclimbingdot),
    errorMessage=>this.alertifService.message(errorMessage,{
     dismissOther:true,
     messageType:MessageType.Error,
     position:Position.Topcenter
    }))
  
   this.dataSource=new MatTableDataSource<List_User>(allUsers.users)
   this.paginator.length=allUsers.totalUsersCount 
   debugger;
  
}

async pageChanged(){
  await this.getUsers()
  debugger;
}
 async ngOnInit(){
   await this.getUsers()
}
assignRole(id:string){
this.dialogSerivce.openDialog({
  componenType:AuthorizeUserDialogComponent,
  data:id,
  options:{
    width:"750px"
  },
  afterClosed:()=>{
    this.alertifService.message("Roller başarıyla atanmıştır",{
      messageType:MessageType.Success,
      position:Position.TopRight
    })
  }
})
}
}
