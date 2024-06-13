import { AnswerAttachment } from '../../enterprise/entities/AnswerAttachment'

export interface AnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteByAnswerId(answerId: string): Promise<void>
}
