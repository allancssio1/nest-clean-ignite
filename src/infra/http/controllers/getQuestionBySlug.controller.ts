import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/useCases/get-question-by-slug'
import { QuestionPresenter } from '../presenters/question-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionsBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionsBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      question: result.value?.question
        ? QuestionPresenter.toHTTP(result.value.question)
        : null,
    }
  }
}
