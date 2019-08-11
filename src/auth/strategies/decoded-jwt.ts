export interface DecodedJwt {
    exp: number;
    iat: number;
    sub: number;
    username: string;
}