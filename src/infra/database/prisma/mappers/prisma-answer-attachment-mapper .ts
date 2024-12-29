import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

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
  static toPrismaUpdateMany(
    attachments: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) =>
      attachment.attachmentId.toString(),
    )

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        answerId: attachments[0].answerId.toString(),
      },
    }
  }
}
