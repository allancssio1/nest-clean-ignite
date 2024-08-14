import { AnswerAttachment } from '../../enterprise/entities/AnswerAttachment'

export abstract class AnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteByAnswerId(answerId: string): Promise<void>
}
