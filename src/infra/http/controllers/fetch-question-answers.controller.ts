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
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/useCases/fetch-questions-answers'
import { QuestionPresenter } from '../presenters/question-presenter'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional() //params optional
  .default('1') //if don't send use number 1
  .transform(Number) //convert value in number
  .pipe(z.number().min(1)) //validation is number and min exixts

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      answers: result.value?.answers.map(AnswerPresenter.toHTTP),
    }
  }
}
