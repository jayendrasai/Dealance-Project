import { Field, ObjectType } from '@nestjs/graphql';
// Assuming User model is defined in ../users/models/user.model.ts (will create later)
import { User } from '../../users/models/user.model'; 

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}