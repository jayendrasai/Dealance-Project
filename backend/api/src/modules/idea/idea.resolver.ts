import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { Idea } from './models/idea.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateIdeaInput } from './dto/create-idea.input';
import { UpdateIdeaInput } from './dto/update-idea.input';

@Resolver(() => Idea)
export class IdeaResolver {
  constructor(private ideaService: IdeaService) {}

  @Query(() => [Idea])
  publicFeed() {
    return this.ideaService.getPublicFeed();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Idea])
  myIdeas(@CurrentUser() user: { userId: string }) {
    return this.ideaService.getMyIdeas(user.userId);
  }

  @Query(() => Idea, { nullable: true })
  idea(@Args('id') id: string) {
    return this.ideaService.getIdea(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Idea)
  createIdea(
    @CurrentUser() user: { userId: string },
    @Args('input') input: CreateIdeaInput,
  ) {
    return this.ideaService.createIdea(user.userId, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Idea)
  updateIdea(
    @CurrentUser() user: { userId: string },
    @Args('input') input: UpdateIdeaInput,
  ) {
    return this.ideaService.updateIdea(user.userId, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  deleteIdea(
    @CurrentUser() user: { userId: string },
    @Args('id') id: string,
  ) {
    return this.ideaService.deleteIdea(user.userId, id);
  }
}
