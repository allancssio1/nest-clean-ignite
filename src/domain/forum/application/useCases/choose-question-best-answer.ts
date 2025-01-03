import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/Question'
import { Injectable } from '@nestjs/common'

interface ChoosenQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
type ChoosenQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    question: Question
  }
>

@Injectable()
export class ChoosenQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoosenQuestionBestAnswerUseCaseRequest): Promise<ChoosenQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new UnauthorazedError())

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({ question })
  }
}
