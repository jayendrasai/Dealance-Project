import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
