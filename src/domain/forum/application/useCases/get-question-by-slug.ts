import { Either, left, right } from '@/core/Either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Injectable } from '@nestjs/common'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
