import { Either, left, right } from '@/core/Either'
import { UnauthorazedError } from '@/core/errors/errors/unauthorazed'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Injectable } from '@nestjs/common'

interface DeleteQuestionUseCaseProps {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | UnauthorazedError,
  null
>
@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseProps): Promise<DeleteQuestionUseCaseResponse> {
    const questionFound = await this.questionRepository.findById(questionId)

    if (!questionFound) return left(new ResourceNotFoundError())

    if (questionFound.authorId.toString() !== authorId)
      return left(new UnauthorazedError())

    await this.questionRepository.delete(questionFound)
    return right(null)
  }
}
