import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JWT } from '../constants';
import { JwtPayload } from './jwt-payload';
import { IUser } from '../../user/entities/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<IUser> {
    return { id: payload.sub, username: payload.username };
  }
}