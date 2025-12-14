import { Field, InputType } from '@nestjs/graphql';
//import { Stage, Visibility } from '@prisma/client';
import { Stage, Visibility } from '../idea.enums';


@InputType()
export class CreateIdeaInput {
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

  @Field(() => Visibility, { defaultValue: Visibility.PUBLIC })
  visibility?: Visibility;
}
