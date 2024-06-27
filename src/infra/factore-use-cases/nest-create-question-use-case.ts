import { QuestionsRepsitory } from '@/domain/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/useCases/create-question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCreateQuestionUseCase extends CreateQuestionUseCase {
  constructor(questionsRepository: QuestionsRepsitory) {
    super(questionsRepository)
  }
}
