import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    const { id, answerId } = raw

    if (!answerId) throw new Error('Invalid attachment type.')

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(id),
        answerId: new UniqueEntityId(answerId),
      },
      new UniqueEntityId(id),
    )
  }
}
