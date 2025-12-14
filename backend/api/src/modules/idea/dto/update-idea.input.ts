import { Field, InputType, ID } from '@nestjs/graphql';
//import { Stage, Visibility } from '@prisma/client';
import { Stage, Visibility } from '../idea.enums';

@InputType()
export class UpdateIdeaInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  problem?: string;

  @Field({ nullable: true })
  solution?: string;

  @Field({ nullable: true })
  targetMarket?: string;

  @Field({ nullable: true })
  traction?: string;

  @Field(() => Stage, { nullable: true })
  stage?: Stage;

  @Field({ nullable: true })
  sector?: string;

  @Field({ nullable: true })
  askAmount?: number;

  @Field(() => Visibility, { nullable: true })
  visibility?: Visibility;
}
