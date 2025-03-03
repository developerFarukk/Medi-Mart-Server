



import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';

export const createToken = (
    jwtPayload: TJwtPayload,
    secret: Secret,
    expiresIn: string | number
) => {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };

    return jwt.sign(jwtPayload, secret, options);
};