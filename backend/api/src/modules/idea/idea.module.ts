import { Module } from '@nestjs/common';
import { IdeaResolver } from './idea.resolver';
import { IdeaService } from './idea.service';

@Module({
  providers: [IdeaResolver, IdeaService],
})
export class IdeaModule {}
