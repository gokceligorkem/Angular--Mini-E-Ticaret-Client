import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit  {
  constructor(snipper:NgxSpinnerService,
    private httpClient:HttpClientService,
    private productService:ProductService,
    private alertifService:AlertifyService,
    private dialogSerivce:DialogService
    ){
    super(snipper);
  }
  
  displayedColumns: string[] = ['name', 'stock', 'price','createdTime','updatedTime','update','image','delete',];
  dataSource :MatTableDataSource<List_Product>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
async getProducts(){
 
  this.spinnerShow(spinnerType.Ballclimbingdot)
  const allproducts:{totalProductCount:number,products:List_Product[]} =
  await  this.productService.read
  (this.paginator?this.paginator.pageIndex : 0,
    this.paginator?this.paginator.pageSize:5,
    ()=>this.spinnerHide(spinnerType.Ballclimbingdot),
    errorMessage=>this.alertifService.message(errorMessage,{
     dismissOther:true,
     messageType:MessageType.Error,
     position:Position.Topcenter
    }))
  
   this.dataSource=new MatTableDataSource<List_Product>(allproducts.products)
   this.paginator.length=allproducts.totalProductCount 
   debugger;
  
}



async pageChanged(){
  await this.getProducts()
  debugger;
}
 async ngOnInit(){
   await this.getProducts()
}

  async addProductsImages(id:string){
    await this.dialogSerivce.openDialog({
      componenType:SelectProductImageDialogComponent,
      data:id,
   
    })
  }






}
