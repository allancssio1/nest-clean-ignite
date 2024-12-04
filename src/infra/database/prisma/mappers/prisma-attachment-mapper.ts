import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Attachment } from '@/domain/forum/enterprise/entities/Attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    const { id, title, url } = raw
    return Attachment.create({ link: url, title }, new UniqueEntityId(id))
  }

  static toPrisma(raw: Attachment): Prisma.AttachmentUncheckedCreateInput {
    const { id, link, title } = raw
    return {
      id: id.toString(),
      title,
      url: link,
    }
  }
}
