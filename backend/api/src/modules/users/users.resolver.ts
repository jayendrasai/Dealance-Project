// services/api/src/modules/users/users.resolver.ts

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // 💡 Note: The 'me' query is usually placed in the AuthResolver 
  // (as you did), but defining it here is also common and clean. 
  // We'll keep the one in AuthResolver for now, but this one is more detailed.

  // Query to fetch another user's public profile by ID
  @Query(() => User, { nullable: true })
  user(@Args('id') id: string) {
    // No guard is needed if we allow public viewing of profiles
    return this.usersService.findById(id);
  }

  // Mutation to allow the logged-in user to update their own profile
  @UseGuards(GqlAuthGuard) // ⚠️ SECURITY: Must be protected
  @Mutation(() => User)
  updateMyProfile(
    @CurrentUser() user: { userId: string },
    @Args('input') input: UpdateProfileInput,
  ) {
    // The user ID is retrieved from the JWT token via @CurrentUser
    return this.usersService.updateProfile(user.userId, input);
  }
}