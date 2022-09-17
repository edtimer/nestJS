import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { User } from '@prisma/client';
@Controller('user')
export class UserController {
  //in paranthesis we specify what is it guarding for, in this case jwt
  @UseGuards(JwtGuard)
  @Get('profile')
  //the following method uses a custom decorator that returns a prism user
  getUserInfo(@GetUser() user: User, @GetUser('email') email: string) {
    console.log('the email:', email);

    //    return req.user;
    return user;

    return {
      // current_user: this.userService.getCurrentUser(payload.userId)
    };
  }
}
