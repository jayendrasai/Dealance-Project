import { Field , ID, ObjectType } from '@nestjs/graphql';
//import { Visibility, Stage } from '@prisma/client';
import { Stage, Visibility } from '.././idea.enums';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Idea {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  summary: string;

  @Field()
  problem: string;

  @Field()
  solution: string;

  @Field()
  targetMarket: string;

  @Field({ nullable: true })
  traction?: string;

  @Field(() => Stage)
  stage: Stage;

  @Field()
  sector: string;

  @Field({ nullable: true })
  askAmount?: number;

  @Field(() => Visibility)
  visibility: Visibility;

  @Field(() => User)
  founder: User;

  @Field()
  founderId: string;
  
  @Field()
createdAt: Date;

@Field()
updatedAt: Date;

}