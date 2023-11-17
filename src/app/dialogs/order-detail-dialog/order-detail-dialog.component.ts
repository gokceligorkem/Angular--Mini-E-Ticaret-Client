import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/order.service';
import { SingleOrder } from 'src/app/contracts/singleorder';
import { reduce } from 'rxjs';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderState, OrdercompleteComponent } from '../ordercomplete/ordercomplete.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { spinnerType } from 'src/app/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  
  constructor(
    private orderService:OrderService,
    private Dialogservice:DialogService,
    private snipper:NgxSpinnerService,
    private toastrService:CustomerToastrService,
    dialogRef:MatDialogRef<OrderDetailDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string){
    
    super(dialogRef);
  }
  displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;

  singleOrder:SingleOrder;
  async ngOnInit() {
  this.singleOrder= await this.orderService.getByIdOrders(this.data as string)
  
  this.dataSource=this.singleOrder.basketItems
this.totalPrice=this.singleOrder.basketItems
.map((basketItem,index)=>basketItem.price*basketItem.quantity)
.reduce((price,current)=>price+current);
  }

  completeOrder(){
    this.Dialogservice.openDialog({
      componenType:OrdercompleteComponent,
      data:CompleteOrderState.Yes,
      afterClosed:async ()=>{
        this.snipper.show(spinnerType.Ballclimbingdot)
       await this.orderService.CompleteOrder(this.data as string)
       this.snipper.hide(spinnerType.Ballclimbingdot)
       this.toastrService.message("Sipariş başarıyla tamamlanmıştır.Müşteriye mail gönderilmiştir.","Sipariş Hazır",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
       })
      }
      
    })
  }
}
export enum OrderDetailDialogState{
  Close,ShopingComplete
} 

