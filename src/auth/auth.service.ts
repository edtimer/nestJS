import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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
    const verifiedUser = possibleUser;
    return this.signToken(verifiedUser.id, verifiedUser.email);
  }
  //async function since we will use prisma in creating a user
  async signUp(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save user to db
    try {
      const registerdUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      //return jwt token for registered user
      return this.signToken(registerdUser.id, registerdUser.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('user exists');
      }
    }
  }
  //no need to make the function async since we mentioned the return type as promise so nestjs infers it
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      //A convention of having a unique identifier used in jwt called sub
      sub: userId,
      email,
    };
    //2 options required
    //1)Payload which is what will be signed
    //2)options which is the properties like expiry time and the token used to sign
    const secret = this.config.get('SECRET_TOKEN');

    const generatedToken = await this.jwt.signAsync(payload, {
      //when token expires
      expiresIn: '15m',
      //the secret coming from env file
      secret: secret,
    });

    return {
      access_token: generatedToken,
    };
  }
}
