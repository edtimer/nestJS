import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';

@Controller('user')
export class UserController {
  //in paranthesis we specify what is it guarding for, in this case jwt
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getMe() {
    return {
      info: 'user specific info',
    };
  }
}
