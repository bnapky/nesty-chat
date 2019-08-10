import { Injectable } from '@nestjs/common';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class AuthService {

  private readonly regexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  constructor(private readonly userService: UserService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { username } });

    if (user && await this.userService.compareHash(password, user.password))
      return user;

    return null;
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
