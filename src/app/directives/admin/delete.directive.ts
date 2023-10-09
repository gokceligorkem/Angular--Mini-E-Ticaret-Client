
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  NgxSpinnerService } from 'ngx-spinner';
import {  spinnerType } from 'src/app/base/base.component';
import { RemoveDialogComponent, RemoveState } from 'src/app/dialogs/remove-dialog/remove-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { firstValueFrom } from 'rxjs';
import { DialogService } from 'src/app/services/common/dialog.service';
import { async } from '@angular/core/testing';

declare var $:any
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective  {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifService:AlertifyService,
    private dialogService:DialogService
  ) {
   
      const img=_renderer.createElement("img")
      img.setAttribute("style","cursor","pointer")
      img.setAttribute("src","/assets/icon/trash.png")
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img)
  }

  @Output() refreshlist:EventEmitter<any>=new EventEmitter()
  @Input() id:string;
  @Input()controller:string;

  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog( {
      componenType:RemoveDialogComponent,
      data:RemoveState.Yes,
      afterClosed:async()=>{
        this.spinner.show(spinnerType.Ballclimbingdot);
        const td: HTMLTableCellElement = this.element.nativeElement;
        
        try {
          await firstValueFrom(this.httpClientService.delete(this.id, {
            controller: this.controller,
          }));
    
          $(td.parentElement).fadeOut(2000, () => {
            this.refreshlist.emit();
            this.alertifService.message("Başarıyla silindi.", {
              dismissOther: true,
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          });
        } catch (errorResponse) {
          this.spinner.hide(spinnerType.Ballclimbingdot)
          this.alertifService.message("Ürün silinemedi.", {
            dismissOther: true,
            messageType: MessageType.Error,
            position: Position.Topcenter,
          });
          
        }
      }
     
    });
  }

  
  _
}
