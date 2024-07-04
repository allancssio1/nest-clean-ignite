import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/useCases/fetch-recent-questions'

const pageQueryParamsSchema = z
  .string()
  .optional() //params optional
  .default('1') //if don't send use number 1
  .transform(Number) //convert value in number
  .pipe(z.number().min(1)) //validation is number and min exixts

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private fetchQuestionRecents: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const questions = await this.fetchQuestionRecents.execute({
      page,
    })

    return { questions }
  }
}
