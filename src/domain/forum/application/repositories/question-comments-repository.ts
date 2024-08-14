import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'

export abstract class QuestionCommentsRepository {
  abstract create(questioncomment: QuestionComment): Promise<QuestionComment>
  abstract delete(questioncomment: QuestionComment): Promise<void>
  abstract findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[] | []>
  abstract findById(id: string): Promise<QuestionComment | null>
}
