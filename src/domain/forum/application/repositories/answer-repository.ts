import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/Answer'

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<Answer>
  abstract delete(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
  abstract findById(answerId: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[] | []>
}
