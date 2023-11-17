import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { OrderService } from 'src/app/services/common/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit  
   {
    constructor(snipper:NgxSpinnerService,
      private httpClient:HttpClientService,
      private orderService:OrderService,
      private alertifService:AlertifyService,
      private dialogSerivce:DialogService,

      ){
      super(snipper);
    }
    
    displayedColumns: string[] = ['orderCode', 'username', 'totalPrice','createdTime','completed','viewdetail','delete',];
    dataSource :MatTableDataSource<List_Order>=null
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
  async getOrders(){
   
    this.spinnerShow(spinnerType.Ballclimbingdot)
    const allOrders:{totalOrderCount:number,orders:List_Order[]} =
    await  this.orderService.getAllOrders
    (this.paginator?this.paginator.pageIndex : 0,
      this.paginator?this.paginator.pageSize:5,
      ()=>this.spinnerHide(spinnerType.Ballclimbingdot),
      (errorMessage:any)=>this.alertifService.message(errorMessage,{
       dismissOther:true,
       messageType:MessageType.Error,
       position:Position.Topcenter
      }))
    
     this.dataSource=new MatTableDataSource<List_Order>(allOrders.orders)
     this.paginator.length=allOrders.totalOrderCount 
     debugger;
    
  }

  async pageChanged(){
    await this.getOrders()
    debugger;
  }
   async ngOnInit(){
     await this.getOrders()
  }
  showDetail(id:string){
    this.dialogSerivce.openDialog({
      componenType:OrderDetailDialogComponent,
      data:id,
      options:{
        width:"800px"
      }
    })
  }
}
