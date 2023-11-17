import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorizeMenuDialogComponent } from '../authorize-menu-dialog/authorize-menu-dialog.component';
import { RoleService } from 'src/app/services/common/models/role.service';
import { AuthorizeendpointService } from 'src/app/services/common/models/authorizeendpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSelectionList } from '@angular/material/list';
import { spinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  roles: { datas: List_Role[], totalCount: number };
  assignRoles: Array<string>;
  listRoles: { name: string; selected: boolean }[];

  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private  roleService:RoleService,
    private userService:UserService,
    private authorizationEndPoints:AuthorizeendpointService,
    private spinnerService:NgxSpinnerService){
  
   super(dialogRef);
   
 }

  async ngOnInit() {
    this.spinnerService.show(spinnerType.Ballclimbingdot)
    this.assignRoles = await this.userService.getRolesToUser(this.data, ()=>this.spinnerService.hide(spinnerType.Ballclimbingdot));
    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => ({
      name: r.name,
      selected: this.assignRoles?.indexOf(r.name) > -1
    }));
  }

  assignRole(roleList: MatSelectionList) {
    const roles: string[] = roleList.selectedOptions.selected.map(r => r._elementRef.nativeElement.innerText);
    this.spinnerService.show(spinnerType.Ballclimbingdot);

    this.userService.assignRoleToUser(
     
      this.data,
      roles,
      () => {
        this.spinnerService.hide(spinnerType.Ballclimbingdot);
      },
      error => {
        // Handle error
      }
    );
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}
