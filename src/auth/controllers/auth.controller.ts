import { Controller, Request, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { PASSWORD_ERROR_MESSAGE } from '../constants';
import { UserSession } from '../strategies/user-session';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<UserSession> {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Request() req): Promise<UserSession> {

        const { username, password } = req.body;
        const user = await this.userService.findOne({ where: { username } });

        if (user)
            throw new HttpException(`Username ${username} has already been registered`, HttpStatus.FORBIDDEN);

        if (!this.authService.isPasswordValid(password))
            throw new HttpException(`Password ${password} is too weak. ${PASSWORD_ERROR_MESSAGE}`, HttpStatus.FORBIDDEN);

        const registeredUser = await this.userService.register(username, password);
        return await this.authService.login(registeredUser);
    }
}
