import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtServiceMock {
    sign = jest.fn((x) => 'Fake Token');
    verifyAsync = jest.fn((x) => Promise.resolve({exp: 100, iat: 100, sub: 1, username: 'napky'}));
}