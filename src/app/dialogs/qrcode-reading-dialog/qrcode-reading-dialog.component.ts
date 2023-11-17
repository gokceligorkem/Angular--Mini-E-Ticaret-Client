import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { BaseDialog } from '../base/base-dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatButton } from '@angular/material/button';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { spinnerType } from 'src/app/base/base.component';
declare var $:any
@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit,OnDestroy{
  constructor(dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string ,
     private spinner:NgxSpinnerService,
     private productService:ProductService,
     private toastrService:CustomerToastrService
    ) {
    super(dialogRef)
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  @ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent;
  @ViewChild("txtStock",{static:true}) txtStock:ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }
  onevent(e){
    const data:any=(e as {data:string}).data;
    this.spinner.show(spinnerType.Ballclimbingdot)
    if(data !=null && data !=""){
      var jsonData=  JSON.parse(data)
      var stockValue=  (this.txtStock.nativeElement as HTMLInputElement).value
   
 
    this.productService.UpdateProductQRCodeStock(jsonData.Id, parseInt(stockValue),()=>{
     
      $("#btnClose").click()
      this.toastrService.message(`{jsonData .Name} ürünün stok bilgisi ${stockValue}güncellenmiştir.`,"Stok güncellenmiştir",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
      this.spinner.hide(spinnerType.Ballclimbingdot)

     })
    }
  }
}
