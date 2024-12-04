import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/Student'
import { PrismaService } from '../pisma.services'
import { Injectable } from '@nestjs/common'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/Attachment'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)
    await this.prisma.attachment.create({
      data,
    })
    // return PrismaAttachmentMapper.toDomain(newAttachment)
  }
}
