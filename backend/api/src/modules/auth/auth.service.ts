// services/api/src/modules/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { User, Role } from '@prisma/client'; // Import client models

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // 💡 Generates the JWT (called by both signup and login)
  private async signToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async signup(input: SignupInput) {
    // 1. Check if user exists
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }

    // 2. Hash the password (Security CRITICAL)
    const saltRounds = 10;
    const hashed = await bcrypt.hash(input.password, saltRounds);

    // 3. Create the user record
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: hashed,
        name: input.fullName,
        role: Role.FOUNDER, // Default new user to FOUNDER role
        profile: {
          create: {},
        },
      },
      include: { profile: true }
    });

    // 4. Generate token and return payload
    const accessToken = await this.signToken(user);
    return { accessToken, user };
  }

  async login(input: LoginInput) {
    // 1. Find user by email
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare password hash
    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate token and return payload
    const accessToken = await this.signToken(user);
    return { accessToken, user };
  }

  // Used by the 'me' query to fetch the full user object
  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}