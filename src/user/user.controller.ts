import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //in paranthesis we specify what is it guarding for, in this case jwt
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getUserInfo(@Req() req: Request) {
    console.log({ user: req.user });

    return {
      // current_user: this.userService.getCurrentUser(payload.userId)
    };
  }
}
