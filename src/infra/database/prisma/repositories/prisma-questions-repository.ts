import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepsitory } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/Question'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepsitory implements QuestionsRepsitory {
  constructor(private readonly prisma: PrismaService) {}
  create(question: Question): Promise<Question> {
    throw new Error('Method not implemented.')
  }
  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }
  findManyRecents({ page }: PaginationParams): Promise<Question[] | []> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { id } })

    return question ? PrismaQuestionMapper.toDomain(question) : null
  }
}
