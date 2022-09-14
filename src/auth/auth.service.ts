import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      delete user.hash;

      //return the user
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('user exists');
      }
    }
  }
}
