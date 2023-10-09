import {  MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DailogComponent> {
    constructor(public dialogRef:MatDialogRef<DailogComponent>){}
    close(){
        this.dialogRef.close();
    }
}
