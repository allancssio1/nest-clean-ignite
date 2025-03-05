import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../pisma.services'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly answerAttachmentsRepository: AnswerAttachmentRepository,
  ) {}

  async create(answer: Answer): Promise<Answer> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    const newAnswer = await this.prisma.answer.create({
      data,
    })
    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    )
    return PrismaAnswerMapper.toDomain(newAnswer)
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({ where: { id: answer.id.toString() } })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await Promise.all([
      await this.prisma.answer.update({
        where: { id: answer.id.toString() },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachments.getNewItems(),
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems(),
      ),
    ])
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: { id: answerId },
    })

    return answer ? PrismaAnswerMapper.toDomain(answer) : null
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[] | []> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }
}
