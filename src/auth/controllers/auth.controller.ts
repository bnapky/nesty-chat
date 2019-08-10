import { Controller, Request, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { passwordErrorMessage } from '../constants';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @Post('register')
    async register(@Request() req) {

        const { username, password } = req.body;
        const user = await this.userService.findOne({ where: { username } });

        if (user)
            throw new HttpException(`Username ${username} has already been registered`, HttpStatus.FORBIDDEN);

        if (!this.authService.isPasswordValid(password))
            throw new HttpException(`Password ${password} is too weak. ${passwordErrorMessage}`, HttpStatus.FORBIDDEN);

        return await this.userService.register(username, password);
    }
}
