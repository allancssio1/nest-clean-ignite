import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/AnswerAttachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
