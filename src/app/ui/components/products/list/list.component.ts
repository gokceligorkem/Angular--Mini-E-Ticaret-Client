import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/baseurl';
import { Add_Basket_Item } from 'src/app/contracts/basket/add_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/fileservice.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/customer-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService:FileService,
    private basketService:BasketService,
    spinner:NgxSpinnerService,
    private customToastrService:CustomerToastrService
  ) {
    super(spinner);
  }

  currentPageNo: number;
  pagesize: number = 12;
  totalProductCount: number;
  totalPageCount: number;
  pageList: number[] = [];
  baseUrl:BaseUrl;
  products: List_Product[]; //datadaki ürünleri atabilmek için
 async ngOnInit() {
    this.baseUrl=await this.fileService.getBaseStogare()
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data: { totalProductCount: number; products: List_Product[] } =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pagesize,
          () => {},
          (errorMessage) => {}
        );


      this.products = data.products;
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pagesize);
   

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdTime: p.createdTime,
          imagePath: p.FilesImage.length ? p.FilesImage.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedTime: p.updatedTime,
          FilesImage: p.FilesImage
        };
        return listProduct;
      });
     
      this.pageList = [];
   
      if (this.currentPageNo - 3 <= 0)
      for (let i = 1; i <= 4; i++)
        this.pageList.push(i);

    else if (this.currentPageNo + 3 >= this.totalPageCount)
      for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
        this.pageList.push(i);

    else
      for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
        this.pageList.push(i);
    });
  }
 async addToBasket(product:List_Product){
  this.spinnerShow(spinnerType.Ballclimbingdot)
    let _basketItem:Add_Basket_Item = new Add_Basket_Item();
    _basketItem.productId=product.id
    _basketItem.quantity=1;
   await this.basketService.add(_basketItem)
   this.spinnerHide(spinnerType.Ballclimbingdot)
   this.customToastrService.message("Ürün sepete eklenmiştir.","Sepet eklendi",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopRight
   })
  }
}
