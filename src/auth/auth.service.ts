import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signIn() {
    return { msg: 'this is the sign in' };
  }
  signUp() {
    return { msg: 'this is the sign up' };
  }
}
