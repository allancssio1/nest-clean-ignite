import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/QuestionComment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../pisma.services'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper '

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(questioncomment: QuestionComment): Promise<QuestionComment> {
    const data = PrismaQuestionCommentMapper.toPrisma(questioncomment)
    const questionComment = await this.prisma.comment.create({
      data,
    })
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async delete(questioncomment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: questioncomment.id.toString() },
    })
  }
  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[] | []> {
    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }
  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    return questionComment
      ? PrismaQuestionCommentMapper.toDomain(questionComment)
      : null
  }
}
