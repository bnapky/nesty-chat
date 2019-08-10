import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

/**
 * Explicitely excluding password from serialization on all routes and only exposing:
 * get /users
 * get /users:id
 */

@Crud({
    model: {
        type: User,
    },
    routes: {
        only: ['getManyBase', 'getOneBase'],
    },
    query: {
        exclude: ['password']
    }
})
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(public service: UserService) { }
}
