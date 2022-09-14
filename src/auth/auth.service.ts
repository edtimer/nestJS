import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(dto: AuthDto) {
    console.log('got this', dto.email);

    //find user by email
    const possibleUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user doesnt exist throw an exception
    if (!possibleUser)
      throw new ForbiddenException('incorrect email or password');
    //compare password
    //! using argon2 the parameters required are
    //1)the hashed password
    //2)the password in plain text from dto
    const pwMatch = await argon.verify(possibleUser.hash, dto.password);
    //incorrect password and throw exception
    if (!pwMatch) throw new ForbiddenException('incorrect email or password');
    //all good send user
    delete possibleUser.hash;
    const verifiedUser = possibleUser;
    return verifiedUser;
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
