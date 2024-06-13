import { Either, right } from '@/core/Either'
import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepsitory } from '../repositories/questions-repository'

export interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepsitory) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({ page })

    return right({ questions })
  }
}
