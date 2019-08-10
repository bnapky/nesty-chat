import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    private readonly rounds = 10;

    constructor(@InjectRepository(User) repo) {
        super(repo);
    }

    async register(username: string, password: string): Promise<User> {
        const user = this.repo.create({username, password});
        user.password = await this.hash(password);
        
        await this.repo.insert(user);

        return user;
    }

    compareHash = (password: string, hash: string): string => bcrypt.compare(password, hash)

    private hash = (password: string): string => bcrypt.hash(password, this.rounds)

}
