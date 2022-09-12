import { Controller, Post,Body } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('prodcuts')
export class ProductsController{

    constructor(private readonly productService:ProductsService){

    }

@Post('add')
    addProduct(@Body() prod:Product){
        //here we strore the added product locally
this.productService.insertProduct(prod);

    }
}