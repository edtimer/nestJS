import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//global ensures other modules have direct access to the service mentioned below it
@Global()
@Module({
  providers: [PrismaService],
  //the following is needed to be able to use the prisma service in other modules
  exports:[PrismaService]
})
export class PrismaModule {}
