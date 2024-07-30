import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/QuestionComment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  create(questioncomment: QuestionComment): Promise<QuestionComment> {
    throw new Error('Method not implemented.')
  }
  delete(questioncomment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[] | []> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }
}
