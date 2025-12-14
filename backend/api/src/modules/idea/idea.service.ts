import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateIdeaInput } from './dto/create-idea.input';
import { UpdateIdeaInput } from './dto/update-idea.input';

@Injectable()
export class IdeaService {
  constructor(private prisma: PrismaService) {}

  createIdea(founderId: string, input: CreateIdeaInput) {
    return this.prisma.ideaCard.create({
      data: {
        ...input,
        founderId,
      },
      include: { founder: true },
    });
  }

  getPublicFeed() {
    return this.prisma.ideaCard.findMany({
      where: { visibility: 'PUBLIC' },
      orderBy: { createdAt: 'desc' },
      include: { founder: true },
    });
  }

  getMyIdeas(founderId: string) {
    return this.prisma.ideaCard.findMany({
      where: { founderId },
      orderBy: { createdAt: 'desc' },
    });
  }

  getIdea(id: string) {
    return this.prisma.ideaCard.findUnique({
      where: { id },
      include: { founder: true },
    });
  }

  async updateIdea(founderId: string, input: UpdateIdeaInput) {
    const existing = await this.getIdea(input.id);
    if (!existing) throw new NotFoundException('Idea not found');
    if (existing.founderId !== founderId)
      throw new ForbiddenException('Not your idea');

    return this.prisma.ideaCard.update({
      where: { id: input.id },
      data: { ...input },
      include: { founder: true },
    });
  }

  async deleteIdea(founderId: string, id: string) {
    const existing = await this.getIdea(id);
    if (!existing) throw new NotFoundException('Idea not found');
    if (existing.founderId !== founderId)
      throw new ForbiddenException('Not your idea');

    await this.prisma.ideaCard.delete({ where: { id } });
    return true;
  }
}
