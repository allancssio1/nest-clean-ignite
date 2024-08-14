// import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'

export abstract class AnswerCommentRepository {
  abstract create(answercomment: AnswerComment): Promise<AnswerComment>
  abstract delete(answercomment: AnswerComment): Promise<void>
  // abstract save(answercomment: AnswerComment): Promise<void>
  abstract findById(answercommentId: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[] | []>
}
