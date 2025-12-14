// services/api/src/modules/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Define the payload structure coming out of the JWT
export interface JwtPayload {
  sub: string; // The user ID (Subject)
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Where to look for the JWT: Bearer token in the Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Do not ignore token expiration (critical for security)
      ignoreExpiration: false,
      // 3. The secret used to sign the token (must match the secret in AuthModule)
      secretOrKey: process.env.JWT_SECRET || 'dev-secret', 
    });
  }

  // 💡 Why validate?
  // If the token is valid, this method is called. It verifies the payload
  // and returns an object. This object is then attached to 'req.user'.
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}