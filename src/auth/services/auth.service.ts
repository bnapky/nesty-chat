import { Injectable } from '@nestjs/common';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { username } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
