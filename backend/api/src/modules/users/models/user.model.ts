// services/api/src/modules/users/models/user.model.ts

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from './profile.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
  
  // Add other fields from your Prisma User model as needed for GraphQL exposure
}``