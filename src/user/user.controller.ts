import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';
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
  @Get('users')
  async getAllUsers(): Promise<any> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const staff = await res.json();
    console.log(staff);

    //    return req.user;
    return staff;
  }
}
