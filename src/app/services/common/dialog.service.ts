
import { Injectable } from "@angular/core";
import { DialogPosition, MatDialog } from "@angular/material/dialog";

import { ComponentType } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
  })
  export class DialogService{
constructor(private dialog:MatDialog){}
openDialog(dialogParameters:Partial <DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componenType, {
      width:dialogParameters.options?.width, 
      height:dialogParameters.options?.heigth,
      position:dialogParameters.options?.position,
      data: dialogParameters.data,
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data)
      dialogParameters.afterClosed();
    });
  }
}
export class DialogParameters{
componenType:ComponentType<any>;
data:any;
afterClosed:()=>void;
options?:Partial <DialogOptions>=new DialogOptions();
}
export class DialogOptions{
    width?:string="350px";
    heigth?:string;
    position?:DialogPosition;
}
