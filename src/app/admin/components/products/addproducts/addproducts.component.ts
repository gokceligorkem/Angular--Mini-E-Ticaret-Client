import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';



@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent extends BaseComponent implements OnInit {
  constructor(spiner:NgxSpinnerService,private productService:ProductService,private alertify:AlertifyService){
    super(spiner);
    
  }
  ngOnInit(): void {
    
  }
 

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement) {
    this.spinnerShow(spinnerType.Pacman);
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value);

  
    this.productService.create(create_product, () => {
      this.spinnerHide(spinnerType.Pacman);
      this.alertify.message("Ürün eklendi", {
        dismissOther: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
    }, (errormessage) => {
      this.alertify.message(errormessage, {
        dismissOther: true,
        messageType: MessageType.Error,
        position: Position.BottomCenter,
      });
    });
  }
}
