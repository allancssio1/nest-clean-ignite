import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/useCases/fetch-question-comments'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional() //params optional
  .default('1') //if don't send use number 1
  .transform(Number) //convert value in number
  .pipe(z.number().min(1)) //validation is number and min exixts

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      comments: result.value?.questionComments.map(CommentPresenter.toHTTP),
    }
  }
}
