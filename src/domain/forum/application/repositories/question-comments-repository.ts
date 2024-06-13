import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'

export interface QuestionCommentsRepsitory {
  create(questioncomment: QuestionComment): Promise<QuestionComment>
  delete(questioncomment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[] | []>
  findById(id: string): Promise<QuestionComment | null>
}
