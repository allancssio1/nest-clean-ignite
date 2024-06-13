import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseProps {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  null
>
export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
    const answerFound = await this.answerRepository.findById(answerId)

    if (!answerFound) return left(new ResourceNotFoundError())

    if (answerFound.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    await this.answerRepository.delete(answerFound)
    return right(null)
  }
}
