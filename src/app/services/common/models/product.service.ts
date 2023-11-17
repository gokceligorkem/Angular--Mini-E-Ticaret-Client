import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { ListProduct_İmage } from 'src/app/contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:any, errorCallBack?: (errorMessage: string) => void){
    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe(result=>{
      successCallBack();
    
    },(errorResponse:HttpErrorResponse)=>{
     const _error:Array<{key:string,value:Array<string>}>= errorResponse.error;
     let message="";
     _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message+=`${_v}<br>`
          });
     });
     errorCallBack(message);
    });
  }

    async read(page:number=0,
      size:number=5,
      successCallBack?:()=>void, 
      errorCallBack?: (errorMessage: string) => void
      ):Promise<{totalProductCount:number,products:List_Product[]}>{
      const observableData :Observable<{totalProductCount:number,products:List_Product[]}>=this.httpClientService.get<{totalProductCount:number,products:List_Product[]}>({
        controller:"products",
        queryString:`page=${page}&size=${size}`
      });
      try {
        const response = await lastValueFrom(observableData);
    
        if (successCallBack) {
          successCallBack();
        }
    
        return response;
      } catch (error) {
        if (errorCallBack) {
          errorCallBack(error.message);
        }
    
        throw error; // Hata fırlatma, daha üst seviyede işlenebilir
      }
    }
    async delete(id:string){
     const deleteObservable:Observable<any>= this.httpClientService.delete(id,{
        controller:"products"
      })
      await   firstValueFrom(deleteObservable)
      
    }

    async readImages(id: string, successCallBack?: () => void): Promise<ListProduct_İmage[]> {
      const getObservable: Observable<ListProduct_İmage[]> = this.httpClientService.get<ListProduct_İmage[]>({
        action: "GetProductImages",
        controller: "products"
      }, id);
  
      const images = await firstValueFrom(getObservable);
      successCallBack()
      return images;
    }
    async deleteImages(id:string,imageId:string,successCallBack?:()=>void){
     const deleteObservable= this.httpClientService.delete(id,{
        action:"deleteproductimage",
        controller:"products",
        queryString:`imageId=${imageId}`
      })
    await   firstValueFrom(deleteObservable)
    successCallBack()
    }
    async changeShowcaseImage(imageId:string,productId:string,successCallBack?:()=>void):Promise<void>
    {
     const changeShowcaseImageObservable= this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
      })
      await firstValueFrom(changeShowcaseImageObservable);
      successCallBack();
    }

    async UpdateProductQRCodeStock(productId:string,stock:number,successCallBack?:()=>void){
    var observable:Observable<any>=  this.httpClientService.put({
      controller:"products",
      action: "qrcode"
      },{ 
        productId,stock
      });
      await firstValueFrom(observable)
      successCallBack()
    }
}
