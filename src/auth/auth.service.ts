import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signIn() {
    return { msg: 'this is the sign in' };
  }
  //async function since we will use prisma in creating a user
  async signUp(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save user to db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },
    });
    delete user.hash;

    //return the user
    return user;
  }
}
