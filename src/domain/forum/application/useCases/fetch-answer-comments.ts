import { Either, right } from '@/core/Either'
import { AnswerComment } from '../../enterprise/entities/AnswerComment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

export interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({ answerComments })
  }
}
