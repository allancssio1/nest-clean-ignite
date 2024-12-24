import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { EditQuestionUseCase } from '@/domain/forum/application/useCases/edit-question'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @Param('id') questionId: string,
    @CurrentUser()
    user: UserPayload,
  ) {
    const { content, title, attachments } = body
    const userId = user.sub

    const result = await this.editQuestion.execute({
      attachmentsIds: attachments,
      authorId: userId,
      content,
      title,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
