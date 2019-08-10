import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtServiceMock {
    sign = jest.fn((x) => 'Fake Token');
}
