import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
@Controller('user')
export class UserController {
  //in paranthesis we specify what is it guarding for, in this case jwt
  @UseGuards(JwtGuard)
  @Get('profile')
  getUserInfo(@Req() req: Request) {
    console.log('the request here', req.user);

    //    return req.user;
    return 'user info here';

    return {
      // current_user: this.userService.getCurrentUser(payload.userId)
    };
  }
}
