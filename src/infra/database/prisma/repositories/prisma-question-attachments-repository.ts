import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/QuestionAttachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }
  deleteByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
