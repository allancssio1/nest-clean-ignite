// import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/QuestionAttachment'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'

export class QuestionAttachmentsRepositoryInMemory
  implements QuestionAttachmentRepository
{
  items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = await this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async deleteByQuestionId(questionId: string) {
    const questionAttachments = await this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachments
  }
}
