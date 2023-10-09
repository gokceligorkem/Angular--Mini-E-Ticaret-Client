import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomerToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/customer-toastr.service';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpclientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customerToastrService: CustomerToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner: NgxSpinnerService
  ) {}

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
     
      if (file.fileEntry.isFile) {
        const fileEntry = file.fileEntry as FileSystemFileEntry;
        fileEntry.file((_file: File) => {
          fileData.append(_file.name, _file, file.relativePath);
        });
      } else {
        
        const fileEntry = file.fileEntry as FileSystemDirectoryEntry;
      }
    }
    this.dialogService.openDialog({
      componenType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(spinnerType.Ballclimbingdot)
        this.httpclientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe({
          next: (data) => {            
            console.log("Başarılı:", data);        
            const message: string = "Dosyalar başarıyla yüklenmiştir.";      
            this.spinner.hide(spinnerType.Ballclimbingdot);
            if (this.options.isAdminPage) {
              this.alertifyService.message(message, {
                dismissOther: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              });
            } else {
              this.customerToastrService.message(message, "Başarılı.", {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight
              });
            }
          },
          error: (errorResponse: HttpErrorResponse) => {                 
            const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";        
            this.spinner.hide(spinnerType.Ballclimbingdot);
            if (this.options.isAdminPage) {
              this.alertifyService.message(message, {
                dismissOther: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              });
            } else {
              this.customerToastrService.message(message, "Başarısız.", {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.TopRight
              });
            }
          }
        });
      }
    });
    
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
