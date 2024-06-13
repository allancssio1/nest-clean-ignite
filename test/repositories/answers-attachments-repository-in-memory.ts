// import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/AnswerAttachment'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'

export class AnswerAttachmentsRepositoryInMemory
  implements AnswerAttachmentRepository
{
  items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = await this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteByAnswerId(answerId: string) {
    const answerAttachments = await this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
