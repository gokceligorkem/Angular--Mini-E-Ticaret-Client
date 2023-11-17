import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizeendpointService } from 'src/app/services/common/models/authorizeendpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})

export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private  roleService:RoleService,
   private authorizationEndPoints:AuthorizeendpointService,
   private spinnerService:NgxSpinnerService){
 
  super(dialogRef);
  
}
roles: {datas:List_Role[],totalCount:number} ;

assignRoles:Array<string>;
listRoles:{name:string,selected:boolean}[];
 async ngOnInit()  {

  this.assignRoles= await this.authorizationEndPoints.getRolesEndPoint(this.data.code,this.data.menuName)
  this.roles=await this.roleService.getRoles(-1,-1)

    this.listRoles=this.roles.datas.map((r:any)=>{

      return{
        name: r.name,
        selected: this.assignRoles?.indexOf(r.name) > -1
      }
    })

  }


  assignRole(roleList :MatSelectionList){
   const roles:string[]= roleList.selectedOptions.selected.map(r => r._elementRef.nativeElement.innerText);
   this.spinnerService.show(spinnerType.Ballclimbingdot)
   this.authorizationEndPoints.assignRoleEndpoint(roles,this.data.code,this.data.menuName,()=>{
    this.spinnerService.hide(spinnerType.Ballclimbingdot)
   },error=>{

   })
  }
}
export enum AuthorizeMenuState {
  Yes,
  No
}
