import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  //dto means data transmission object which is a nest object that helps us in terms of validating data in body
  signUp(
    //ParseIntPipe converts it to a number
    // @Body('password',ParseIntPipe) password: string,
    @Body() dto: AuthDto,
  ) {
    //would print the body
    console.log(dto);

    return this.authService.signUp(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
