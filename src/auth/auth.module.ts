import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  //providing auth service and passport strategy
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
