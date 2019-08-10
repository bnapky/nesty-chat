import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { userRepositoryMock } from './user-repository.mock';

@Injectable()
export class UserServiceMock {
    repo = userRepositoryMock;

    async register(username: string, password: string): Promise<User> {
        const user = new User();
        user.id = 1;
        user.password = this.hash(password);
        user.username = username;

        return Promise.resolve(user);
    }

    compareHash = (password: string, hash: string): boolean => password.split('').reverse().join() == hash

    private hash = (password: string): string => password.split('').reverse().join()
}
