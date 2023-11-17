import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Add_Basket_Item } from 'src/app/contracts/basket/add_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_Basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpclientService:HttpClientService)
   { }

   async get():Promise<List_Basket_Item[]>{
    const observable:Observable<List_Basket_Item[]>=this.httpclientService.get({
      controller:"basket"
    });
    return   await firstValueFrom(observable)
   }
   async add(basketItem:Add_Basket_Item):Promise<void>{
    const observable:Observable<any>=this.httpclientService.post({
      controller:"basket"
    },basketItem)
    await firstValueFrom(observable)
   }
   async updateQuantity(basketItem:Update_Basket_Item):Promise<void>{
    const observable:Observable<any>=this.httpclientService.put({
      controller:"basket"
    },basketItem)
    await firstValueFrom(observable)
   }
   async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpclientService.delete(basketItemId,{
      controller: "basket"
    });

    await firstValueFrom(observable);
  }
}
