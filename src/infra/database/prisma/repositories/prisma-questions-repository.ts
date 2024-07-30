import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/Question'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(question: Question): Promise<Question> {
    const data = PrismaQuestionMapper.toPrisma(question)
    const newQuestion = await this.prisma.question.create({
      data,
    })
    return PrismaQuestionMapper.toDomain(newQuestion)
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.update({
      data,
      where: { id: data.id },
    })
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { slug } })

    return question ? PrismaQuestionMapper.toDomain(question) : null
  }

  async findManyRecents({ page }: PaginationParams): Promise<Question[] | []> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { id } })

    return question ? PrismaQuestionMapper.toDomain(question) : null
  }

  async delete(question: Question): Promise<void> {
    await this.prisma.question.delete({ where: { id: question.id.toString() } })
  }
}
