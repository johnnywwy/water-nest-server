import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'fkdFYwkcLRVxQOKk',
    });
  }

  async validate(user: any) {
    // 验证token的有效性
    if (!user.id) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
