import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signIn() {
    return { msg: 'this is the sign in' };
  }
  signUp(dto: AuthDto) {
    return { msg: 'this is the sign up' };
  }
}
