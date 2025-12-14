// services/api/src/modules/users/dto/update-profile.input.ts

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  fullName?: string; // Corresponds to 'name' in Prisma User model

  @Field({ nullable: true })
  bio?: string;
  
  @Field({ nullable: true })
  avatarUrl?: string;
}