import { Injectable } from "@nestjs/common";
import {Product} from './product.model'
@Injectable()
export class ProductsService{
products:Product[]=[];

insertProduct(prod:Product){
const newProduct = new Product(prod.id,prod.title,prod.description,prod.price);
this.products.push(newProduct);
}
}