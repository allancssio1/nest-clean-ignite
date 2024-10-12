import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ChoosenQuestionBestAnswerUseCase } from '@/domain/forum/application/useCases/choose-question-best-answer'

const chooseQuestionBestAnswerBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(chooseQuestionBestAnswerBodySchema)

type ChooseQuestionBestAnswerBodySchema = z.infer<typeof chooseQuestionBestAnswerBodySchema>

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(private chooseQuestionBestAnswer: ChoosenQuestionBestAnswerUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('answerId') answerId: string,
    @CurrentUser()
    user: UserPayload,
  ) {
    const userId = user.sub

    const result = await this.chooseQuestionBestAnswer.execute({
      answerId,
      authorId: userId
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
