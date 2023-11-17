import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_Basket_item';
import { Order_Create } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/order.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';
declare  var $:any
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(snipper:NgxSpinnerService,
    private basketService:BasketService
    ,private orderService:OrderService,
    private customToastrservice:CustomerToastrService,
    private router:Router,private dialogService:DialogService){
    super(snipper);
  }
  basketItems:List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    this.spinnerShow(spinnerType.Ballclimbingdot)
  this.basketItems=await this.basketService.get()
      this.spinnerHide(spinnerType.Ballclimbingdot)
  }
  async changeQuantity(object:any){
  this.spinnerShow(spinnerType.Pacman)
   const basketItemId= object.target.attributes["id"].value
   const quantity:number=object.target.value;
   const _basketItem:Update_Basket_Item=new Update_Basket_Item();
   _basketItem.basketItemId=basketItemId
   _basketItem.quantity=quantity
  await this.basketService.updateQuantity(_basketItem)
   this.spinnerHide(spinnerType.Pacman)
  }
   removebasketItem(basketItemId:string){
    // $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componenType:BasketItemRemoveDialogComponent, 
    data:BasketItemDeleteState.Yes, 
    afterClosed:async()=>{
      this.spinnerShow(spinnerType.Pacman)
      await this.basketService.remove(basketItemId)
      $("."+basketItemId).fadeOut(1000,()=> this.spinnerHide(spinnerType.Pacman))
    }
    });


  }
 async shoppingCompletion(){
  this.spinnerShow(spinnerType.Ballclimbingdot)
  const order:Order_Create=new Order_Create();
    order.address="Adress",
    order.description="süper kargo"
    await  this.orderService.create(order)
    this.spinnerHide(spinnerType.Ballclimbingdot)
  this.customToastrservice.message("Sipariş Oluşturuldu","Sipariş Alınmıştır",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopFullWidth
  })
  this.router.navigate(["/"]);
  }
}
