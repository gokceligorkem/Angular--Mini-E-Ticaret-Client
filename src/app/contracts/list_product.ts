import { ListProduct_İmage } from "./list_product_image";

export class List_Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    createdTime :Date;
    updatedTime: Date;
    FilesImage?:ListProduct_İmage[]
    imagePath:string

}