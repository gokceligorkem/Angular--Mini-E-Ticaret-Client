import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
 
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string ,
     private spinner:NgxSpinnerService,
     private qrCodeService:QrCodeService,
     private domSanitizer:DomSanitizer) {
    super(dialogRef)
  }
  qrCodeSafeUrl:SafeHtml
  async ngOnInit()  {
    this.spinner.show(spinnerType.Pacman)
    const qrcodeBlob:Blob =await this.qrCodeService.generateQrCodeService(this.data)
    const url:string=URL.createObjectURL(qrcodeBlob)
   this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url)
   this.spinner.hide(spinnerType.Pacman)
  }


}
export enum CompleteOrderState {
  Yes,
  No
}
