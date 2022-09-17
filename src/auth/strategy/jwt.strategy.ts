import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { prisma } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
//default strategy is jwt , if using a different strategy specify here
export class JwtStrategy extends PassportStrategy(
  Strategy,
  /*can specify the strategy here
  'jwt2'
  'facebook'
'some strategy'
  */
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_TOKEN'),
      //encase you want to determine if expiration is ignored
      // ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      console.log('validated this user', { user: user });
      //deleting user hash before returning request
      delete user.hash;
      return user;
    } catch {
      return null;
    }
    //todo delete hash
    //return { userId: payload.sub, email: payload.email };
  }
}
