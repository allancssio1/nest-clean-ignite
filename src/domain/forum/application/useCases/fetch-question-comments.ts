import { Either, right } from '@/core/Either'
import { QuestionComment } from '../../enterprise/entities/QuestionComment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Injectable } from '@nestjs/common'

export interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
