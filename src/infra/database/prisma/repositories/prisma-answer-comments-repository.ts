import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/AnswerComment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../pisma.services'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper '

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(answercomment: AnswerComment): Promise<AnswerComment> {
    const data = PrismaAnswerCommentMapper.toPrisma(answercomment)
    const answerComment = await this.prisma.comment.create({
      data,
    })
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async delete(answercomment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answercomment.id.toString() },
    })
  }
  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[] | []> {
    const answerComments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answerComments.map(PrismaAnswerCommentMapper.toDomain)
  }
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    return answerComment
      ? PrismaAnswerCommentMapper.toDomain(answerComment)
      : null
  }
}
