// services/api/src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Will be created in Step 3

@Module({
  imports: [
    PassportModule,
    // Configure JWT details
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret', // Load from environment variables
      signOptions: { expiresIn: '7d' }, // Token validity
    }),
    UsersModule, // Importing to potentially use UsersService later (e.g., in a refresh token flow)
  ],
  providers: [
    AuthService, 
    AuthResolver, 
    JwtStrategy, // Register the strategy for Passport
  ],
  exports: [AuthService], // Export the service if needed by other modules
})
export class AuthModule {}