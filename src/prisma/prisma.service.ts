import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
//here we have the logic connecting to db by extending prisma client
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          //todo remove hardcoded dev db url
          url: 'postgresql://postgres:441422@localhost:5432/nestdb?schema=public',
        },
      },
    });
  }
}
