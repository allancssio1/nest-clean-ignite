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
  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }
  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = await this.items.filter((item) =>
      attachments.some((attachments) => !attachments.equals(item)),
    )
    this.items = answerAttachments
  }
}
