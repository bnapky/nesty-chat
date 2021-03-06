import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { UserSession } from '../strategies/user-session';
import { JwtPayload } from '../strategies/jwt-payload';

@Injectable()
export class AuthService {

  private readonly regexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ where: { username }, select: ['password', 'username', 'id'] });

    if (user && await this.userService.compareHash(password, user.password))
      return user;

    return null;
  }

  async login(user: User): Promise<UserSession> {
    const payload: JwtPayload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload), user: { username: user.username, id: user.id }
    };
  }

  /**
   * @param password 
    (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9])	The string must contain at least 1 numeric character
    The string must be eight characters or longer
 */
  public isPasswordValid = (password: string): boolean => this.regexp.test(password);
}
