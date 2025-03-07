import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/Attachment'

export class AttachmentsRepositoryInMemory implements AttachmentRepository {
  constructor() {}

  items: Attachment[] = []

  async create(attachment: Attachment) {
    await this.items.push(attachment)
  }
}
