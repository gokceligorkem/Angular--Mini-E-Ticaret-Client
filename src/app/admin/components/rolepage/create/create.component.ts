import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
constructor(spinner:NgxSpinnerService,private alertifyService:AlertifyService,private roleService:RoleService){
  super(spinner);
}
@Output() createdRole: EventEmitter<string> = new EventEmitter();
create(name:HTMLInputElement){
this.spinnerShow(spinnerType.Ballclimbingdot)
this.roleService.create(name.value,()=>{
  this.alertifyService.message("Role eklenmiştir",{
    messageType:MessageType.Success,
    position:Position.TopRight
  });
  this.createdRole.emit(name.value);

},errorMessage=>{
  this.alertifyService.message(errorMessage,{
    messageType:MessageType.Error,
    position:Position.TopRight
  })
})
}

}
