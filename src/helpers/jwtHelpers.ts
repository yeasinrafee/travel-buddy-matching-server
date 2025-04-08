import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });

  return token;
};

export const jwtHelpers = {
  generateToken,
};
