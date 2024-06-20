import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/AnswerComment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  create(answercomment: AnswerComment): Promise<AnswerComment> {
    throw new Error('Method not implemented.')
  }
  delete(answercomment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(answercommentId: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[] | []> {
    throw new Error('Method not implemented.')
  }
}
