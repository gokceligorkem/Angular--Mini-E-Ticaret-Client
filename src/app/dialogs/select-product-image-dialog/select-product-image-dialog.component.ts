import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ListProduct_İmage } from 'src/app/contracts/list_product_image';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RemoveDialogComponent, RemoveState } from '../remove-dialog/remove-dialog.component';
declare var $:any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog <SelectProductImageDialogComponent>implements OnInit{
constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: SelectProductState|string,
  private productService:ProductService,private spinner:NgxSpinnerService,private dialogService:DialogService){
  super(dialogRef);
}
images:ListProduct_İmage[];
 async ngOnInit() {
  this.spinner.show(spinnerType.Ballclimbingdot)
  this.images= await this.productService.readImages(this.data as string,()=>this.spinner.hide(spinnerType.Ballclimbingdot))
}

@Output() options: Partial<FileUploadOptions> = {
  accept: ".png, .jpg, .jpeg, .gif",
  action: "upload",
  controller: "products",
  explanation: "Ürün resimini seçin veya buraya sürükleyin...",
  isAdminPage: true,
  queryString: `id=${this.data}`
};
deleteImages(imageId:string){

  this.dialogService.openDialog({
    componenType:RemoveDialogComponent,
    data:RemoveState.Yes,
    afterClosed:async()=>{
      this.spinner.show(spinnerType.Pacman)
    await  this.productService.deleteImages(this.data as string,imageId,()=>{this.spinner.hide(spinnerType.Pacman)})
    }
  })


}
showCase(imageId: string) {
  this.spinner.show(spinnerType.Pacman);

  this.productService.changeShowcaseImage(imageId, this.data as string, () => {
    this.spinner.hide(spinnerType.Pacman);
  });
}
}
export enum SelectProductState{
  Yes,No
}