import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

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
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_TOKEN'),
      //encase you want to determine if expiration is ignored
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
