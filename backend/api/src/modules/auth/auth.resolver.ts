// services/api/src/modules/auth/auth.resolver.ts

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth.output';
import { User } from '../users/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  signup(@Args('input') input: SignupInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => AuthPayload)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  // 💡 Security Reminder Applied: Always use the Guard for protected routes.
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me' })
  async getMe(@CurrentUser() user: { userId: string }) {
    return this.authService.findUserById(user.userId);
  }
}