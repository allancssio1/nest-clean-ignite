import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionsRepsitory } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/Question'

interface ChosenQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
type ChosenQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  {
    question: Question
  }
>

export class ChosenQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionsRepsitory,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChosenQuestionBestAnswerUseCaseRequest): Promise<ChosenQuestionBestAnswerUseCaseResponse> {
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
