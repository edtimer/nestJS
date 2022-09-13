import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//here we have the logic connecting to db by extending prisma client
@Injectable()
export class PrismaService extends PrismaClient {
constructor(){

    super({
        datasources:{
            db:{

                url:'postgresql://database source here'
            },
        }
    })
}

}
